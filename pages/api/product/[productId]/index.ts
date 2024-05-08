import { ERROR_MESSAGE } from "@/constants/constant";
import mongoose from "mongoose";

import { Product, User } from "@/lib/db/schema";
import { checkAuthorization, sessionOptions } from "@/lib/server";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/lib/firebaseSetting";
import { ProductImgData } from "@/types/productTypes";
import { getIronSession } from "iron-session";
import { IronSessionType } from "@/types/apiTypes";
import { verifyToken } from "@/lib/token";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const session = await getIronSession<IronSessionType>(
        req,
        res,
        sessionOptions
      );

      const accessToken = session.accessToken;

      const decodeAccessToken = verifyToken(
        accessToken as string,
        process.env.NEXT_SECRET_ACCESS_TOKEN_KEY as string
      );

      const uid = decodeAccessToken?.data?.user.uid;

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

      const isReport = product.reportUserIds.includes(uid);

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
            isFollower: {
              $cond: {
                if: { $eq: [uid, undefined] }, 
                then: false,
                else: {
                  $in: [
                    new mongoose.Types.ObjectId(uid as string),
                    "$followers",
                  ],
                },
              },
            },
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
            convertedProductIds: {
              $map: {
                input: "$productIds",
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
            as: "recentProducts",
          },
        },
        {
          $addFields: {
            recentProducts: {
              $filter: {
                input: "$recentProducts",
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
            isFollower: 1,
            followers: 1,
            followings: 1,
            productIds: 1,
            reviewPercentage: 1,
            recentProducts: 1,
          },
        },
      ];

      const userWithReviews = await User.aggregate(aggregation);

      res.status(200).json({
        message: "상품 조회에 성공했어요.",
        product: {
          ...product._doc,
          isReport,
          auth: { ...userWithReviews[0], uid: userWithReviews[0]._id },
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
    try {
      const isValidAuth = await checkAuthorization(req, res);

      if (!isValidAuth.isValid) {
        res.status(401).json({
          message: isValidAuth.message,
        });
        return;
      }

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

      if (product.uid !== isValidAuth.auth.uid) {
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
        res.status(500).json({
          message: "상품 삭제에 실패했어요.\n잠시 후 다시 시도해주세요.",
        });
        return;
      }

      const profileResult = await User.updateOne({
        $pull: {
          productIds: new mongoose.Types.ObjectId(product._id as string),
        },
      });

      if (!profileResult.acknowledged || profileResult.modifiedCount === 0) {
        console.error("유저 프로필에서 상품 아이디 삭제에 실패했어요.");
        res.status(500).json({
          message: "상품 삭제에 실패했어요.\n잠시 후 다시 시도해주세요.",
        });
        return;
      }

      const result = await Product.deleteOne({
        _id: new mongoose.Types.ObjectId(productId as string),
      });

      if (!result.acknowledged || result.deletedCount === 0) {
        console.error("상품 삭제에 실패했어요.");
        res.status(500).json({
          message: "상품 삭제에 실패했어요.\n잠시 후 다시 시도해주세요.",
        });
      }

      res.status(200).json({ message: "상품이 삭제됬어요." });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "상품 삭제에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}
