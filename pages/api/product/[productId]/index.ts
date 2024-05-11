import mongoose from "mongoose";
import Product from "@/lib/db/models/Product";
import User from "@/lib/db/models/User";
import { checkAuthorization, sessionOptions } from "@/lib/server";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/lib/firebaseSetting";
import { ProductImgData } from "@/types/productTypes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { productId } = req.query;

      if (!productId) {
        res.status(422).json({ message: "상품 아이디가 없어요." });
        return;
      }

      await dbConnect();

      const product = await Product.findOne({
        _id: new mongoose.Types.ObjectId(productId as string),
      });

      if (!product) {
        res.status(404).json({ message: "상품이 존재하지 않아요." });
        return;
      }

      if (product.block) {
        res
          .status(409)
          .json({ message: "신고에 의해 블라인드 처리된 상품이에요." });
        return;
      }

      await Product.updateOne(
        {
          _id: new mongoose.Types.ObjectId(productId as string),
        },
        {
          $inc: { viewCount: 1 },
        }
      );

      // 유저 프로필, 리뷰점수 및 최신 상품 목록을 조인합니다.
      const aggregation = [
        {
          $match: { _id: new mongoose.Types.ObjectId(product.uid as string) },
        },
        {
          $lookup: {
            from: "reviewScore",
            localField: "uid",
            foreignField: "uid",
            as: "reviewInfo",
          },
        },
        {
          $unwind: {
            path: "$reviewInfo",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            reviewPercentage: {
              $cond: {
                if: {
                  $eq: [{ $ifNull: ["$reviewInfo.totalScore", null] }, null],
                },
                then: 0,
                else: {
                  $round: [
                    {
                      $multiply: [
                        {
                          $divide: [
                            "$reviewInfo.totalScore",
                            "$reviewInfo.totalReviewCount",
                          ],
                        },
                        20,
                      ],
                    },
                    1,
                  ],
                },
              },
            },
          },
        },
        {
          $addFields: {
            filteredProductIds: {
              $filter: {
                input: "$productIds",
                as: "id",
                cond: {
                  $ne: [
                    { $toObjectId: "$$id" },
                    new mongoose.Types.ObjectId(productId as string),
                  ],
                },
              },
            },
          },
        },
        {
          $addFields: {
            lastTenProductIds: { $slice: ["$filteredProductIds", -9] },
          },
        },
        {
          $addFields: {
            convertedProductIds: {
              $map: {
                input: "$lastTenProductIds",
                as: "id",
                in: { $toObjectId: "$$id" },
              },
            },
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "convertedProductIds",
            foreignField: "_id",
            as: "recentProductsInfo",
          },
        },
        {
          $addFields: {
            recentProducts: {
              $filter: {
                input: "$recentProductsInfo",
                as: "product",
                cond: { $ne: ["$$product.block", true] },
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            email: 1,
            nickname: 1,
            profileImg: 1,
            followers: 1,
            followings: 1,
            productIds: 1,
            reviewPercentage: 1,
            recentProducts: 1,
          },
        },
      ];

      const userWithReviews = await User.aggregate(aggregation);
      userWithReviews[0].uid = userWithReviews[0]._id;
      delete userWithReviews[0]._id;

      res.status(200).json({
        message: "상품 조회에 성공했어요.",
        product: {
          ...product._doc,
          auth: { ...userWithReviews[0] },
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "상품 조회에 실패했어요\n잠시 후 다시 시도해주세요.",
      });
    }
  }

  if (req.method === "PATCH") {
    try {
      const isValidAuth = await checkAuthorization(req, res);
      if (!isValidAuth.isValid) {
        res.status(401).json({
          message: isValidAuth.message,
        });
        return;
      }
      const { productId } = req.query;
      const { productData } = req.body;

      if (!productId) {
        res.status(422).json({ message: "상품 id가 없어요." });
        return;
      }

      if (!productData) {
        res.status(422).json({ message: "상품 수정 데이터가 없어요." });
        return;
      }

      await dbConnect();

      const product = await Product.findOne({
        _id: new mongoose.Types.ObjectId(productId as string),
      });

      if (!product) {
        res.status(404).json({ message: "상품이 존재하지 않아요." });
        return;
      }

      const result = await Product.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(productId as string) },
        { $set: productData },
        { returnNewDocument: true }
      );

      if (!result) {
        res.status(500).json({ message: "상품 수정에 실패하였습니다." });
        return;
      }

      res
        .status(200)
        .json({ message: "상품 수정에 성공했어요.", product: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "상품 수정에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }

  if (req.method === "DELETE") {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const isValidAuth = await checkAuthorization(req, res);

      if (!isValidAuth.isValid) {
        await session.endSession();
        res.status(401).json({
          message: isValidAuth.message,
        });
        return;
      }

      const { productId } = req.query;

      const myUid = isValidAuth?.auth?.uid;

      if (!productId) {
        await session.endSession();
        res.status(422).json({ message: "상품 아이디가 없어요." });
        return;
      }

      await dbConnect();

      const product = await Product.findOne({
        _id: new mongoose.Types.ObjectId(productId as string),
      }).session(session);

      if (!product) {
        await session.endSession();
        res.status(404).json({ message: "상품이 존재하지 않아요." });
        return;
      }

      if (product.uid !== myUid) {
        await session.endSession();
        res
          .status(401)
          .json({ message: "잘못된 요청이에요. 로그인 정보를 확인해주세요." });
        return;
      }
      const productImgNameArray = product.imgData.map(
        (data: ProductImgData) => data.name
      );

      try {
        const removeImgPromise = productImgNameArray.map((name: string) => {
          return deleteObject(ref(storage, `images/product/${name}`));
        });

        await Promise.all(removeImgPromise);
      } catch (error) {
        console.error(error);
        console.log("상품 이미지 삭제에 실패했어요.");
      }

      const profileResult = await User.updateOne(
        { _id: new mongoose.Types.ObjectId(myUid) },
        {
          $pull: {
            productIds: new mongoose.Types.ObjectId(product._id as string),
          },
        },
        { session }
      );

      const productResult = await Product.deleteOne(
        {
          _id: new mongoose.Types.ObjectId(productId as string),
        },
        { session }
      );

      if (
        !profileResult.acknowledged ||
        profileResult.modifiedCount === 0 ||
        !productResult.acknowledged ||
        productResult.deletedCount === 0
      ) {
        throw new Error("상품 삭제에 실패했어요.\n잠시 후 다시 시도해주세요.");
      }

      await session.commitTransaction();
      session.endSession();
      res.status(200).json({ message: "상품이 삭제됬어요." });
    } catch (error) {
      console.error(error);
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({
        message: "상품 삭제에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}
