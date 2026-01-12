import dbConnect from "@/shared/common/utils/db/db";
import Product from "@/domains/product/shared/models/Product";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/domains/auth/shared/common/models/User";
import Wish from "@/domains/product/shared/models/Wish";
import checkAuthorization from "@/domains/auth/shared/common/utils/checkAuthorization";
import {
  ProductImgData,
  ProductStatus
} from "@/domains/product/shared/types/productTypes";
import SaleTrading from "@/domains/product/shared/models/SaleTrading";
import { getStorageInstance } from "@/shared/common/utils/firebaseSetting";
import { deleteObject, ref } from "firebase/storage";
import { TradingStatus } from "@/domains/product/manage/types/productManageTypes";
import * as Sentry from "@sentry/nextjs";
import { revalidatePath } from "next/cache";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;

    if (!productId) {
      return NextResponse.json(
        { message: "상품 ID가 없어요." },
        { status: 404 }
      );
    }
    if (productId.length < 24) {
      return NextResponse.json(
        { message: "잘못된 상품 ID에요." },
        { status: 404 }
      );
    }

    await dbConnect();

    const isValidAuth = await checkAuthorization();
    const myUid = isValidAuth?.auth?.uid || null;

    const product = await Product.findOne({
      _id: new mongoose.Types.ObjectId(productId as string)
    });

    if (!product) {
      return NextResponse.json(
        { message: "상품이 존재하지 않아요." },
        { status: 404 }
      );
    }

    if (product.block) {
      return NextResponse.json(
        { message: "신고에 의해 블라인드 처리된 상품이에요." },
        { status: 409 }
      );
    }

    // 👇 상품 작성자 ID
    const productOwnerId = product.uid;

    const followPromise =
      myUid && String(myUid) !== String(productOwnerId)
        ? mongoose.connection.collection("follows").findOne({
            followerId: new mongoose.Types.ObjectId(myUid),
            followingId: new mongoose.Types.ObjectId(productOwnerId)
          })
        : Promise.resolve(null);

    const wishPromise = myUid
      ? Wish.exists({
          userId: new mongoose.Types.ObjectId(myUid),
          productId: new mongoose.Types.ObjectId(productId as string)
        })
      : Promise.resolve(null);

    const [followExists, wishExists] = await Promise.all([
      followPromise,
      wishPromise
    ]);

    const isFollow = !!followExists;
    const isWish = !!wishExists;

    // 유저 프로필, 리뷰점수 및 최신 상품 목록을 조인합니다.
    const aggregation = [
      {
        $match: { _id: new mongoose.Types.ObjectId(productOwnerId as string) }
      },
      {
        $lookup: {
          from: "reviewScores",
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$uid", productOwnerId as string] }
              }
            }
          ],
          as: "reviewInfo"
        }
      },
      {
        $unwind: {
          path: "$reviewInfo",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          reviewPercentage: {
            $cond: {
              if: {
                $eq: [{ $ifNull: ["$reviewInfo.totalReviewScore", null] }, null]
              },
              then: 0,
              else: {
                $round: [
                  {
                    $multiply: [
                      {
                        $divide: [
                          "$reviewInfo.totalReviewScore",
                          "$reviewInfo.totalReviewCount"
                        ]
                      },
                      20
                    ]
                  },
                  1
                ]
              }
            }
          }
        }
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
                  new mongoose.Types.ObjectId(productId as string)
                ]
              }
            }
          }
        }
      },
      {
        $addFields: {
          lastTenProductIds: { $slice: ["$filteredProductIds", -9] }
        }
      },
      {
        $addFields: {
          convertedProductIds: {
            $map: {
              input: "$lastTenProductIds",
              as: "id",
              in: { $toObjectId: "$$id" }
            }
          }
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "convertedProductIds",
          foreignField: "_id",
          as: "recentProductsInfo"
        }
      },
      {
        $addFields: {
          recentProducts: {
            $filter: {
              input: "$recentProductsInfo",
              as: "product",
              cond: { $ne: ["$$product.block", true] }
            }
          }
        }
      },
      {
        $project: {
          nickname: 1,
          profileImg: 1,
          recentProducts: 1,
          reviewPercentage: 1
        }
      }
    ];

    const userWithReviews = await User.aggregate(aggregation);
    userWithReviews[0].uid = userWithReviews[0]._id;
    delete userWithReviews[0]._id;

    return NextResponse.json(
      {
        message: "상품 조회에 성공했어요.",
        product: {
          ...product._doc,
          isWish,
          auth: { ...userWithReviews[0], isFollow }
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json(
      { message: "상품 조회에 실패했어요\n잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  {
    params
  }: {
    params: Promise<{ productId: string }>;
  }
) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const isValidAuth = await checkAuthorization();
    if (!isValidAuth.isValid) {
      return NextResponse.json(
        { message: isValidAuth.message },
        { status: 401 }
      );
    }

    const myUid = isValidAuth?.auth?.uid;
    const { productId } = await params;
    const { productData } = await req.json();

    if (!productId) {
      return NextResponse.json(
        { message: "상품 ID가 없어요." },
        { status: 422 }
      );
    }

    if (productId.length < 24) {
      return NextResponse.json(
        { message: "잘못된 상품 ID에요." },
        { status: 422 }
      );
    }

    if (!productData) {
      return NextResponse.json(
        { message: "상품 수정 데이터가 없어요." },
        { status: 422 }
      );
    }

    await dbConnect();

    const product = await Product.findOne({
      _id: new mongoose.Types.ObjectId(productId as string)
    });

    if (!product) {
      return NextResponse.json(
        { message: "상품이 존재하지 않아요." },
        { status: 404 }
      );
    }

    if (product.uid !== myUid) {
      await session.endSession();
      return NextResponse.json(
        { message: "잘못된 요청이에요.\n로그인 정보를 확인해주세요." },
        { status: 401 }
      );
    }

    if (product.status === ProductStatus.trading) {
      return NextResponse.json(
        { message: "거래중인 상품은 수정할 수 없어요." },
        { status: 409 }
      );
    }

    if (product.status === ProductStatus.soldout) {
      return NextResponse.json(
        { message: "판매된 상품은 수정할 수 없어요." },
        { status: 409 }
      );
    }

    const result = await Product.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(productId as string) },
      { $set: productData },
      { returnDocument: "after" }
    );

    if (!result) {
      return NextResponse.json(
        { message: "상품 수정에 실패하였습니다." },
        { status: 500 }
      );
    }

    if (productData.name || productData.price || productData.imgData) {
      await SaleTrading.updateOne(
        {
          productId: new mongoose.Types.ObjectId(productId as string),
          status: TradingStatus.TRADING
        },
        {
          productName: result.name,
          productPrice: result.price,
          productImg: result.imgData[0].url
        },
        { session }
      );
    }
    await session.commitTransaction();
    session.endSession();

    // 상품 페이지 재검증
    revalidatePath(`/product`);
    // 상품 상세 페이지 재검증
    revalidatePath(`/product/${productId}`);

    return NextResponse.json(
      { message: "상품 수정에 성공했어요.", product: result },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      { message: "상품 수정에 실패했어요.\n잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const isValidAuth = await checkAuthorization();

    if (!isValidAuth.isValid) {
      await session.endSession();
      return NextResponse.json(
        { message: isValidAuth.message },
        { status: 401 }
      );
    }

    const { productId } = await params;
    const myUid = isValidAuth?.auth?.uid;

    if (!productId) {
      await session.endSession();
      return NextResponse.json(
        { message: "상품 ID가 없어요." },
        { status: 422 }
      );
    }

    if (productId.length < 24) {
      return NextResponse.json(
        { message: "잘못된 상품 ID에요." },
        { status: 422 }
      );
    }

    await dbConnect();

    const product = await Product.findOne({
      _id: new mongoose.Types.ObjectId(productId as string)
    }).session(session);

    if (!product) {
      await session.endSession();
      return NextResponse.json(
        { message: "상품이 존재하지 않아요." },
        { status: 404 }
      );
    }

    if (product.uid !== myUid) {
      await session.endSession();
      return NextResponse.json(
        { message: "잘못된 요청이에요.\n로그인 정보를 확인해주세요." },
        { status: 401 }
      );
    }

    if (product.status === ProductStatus.trading) {
      return NextResponse.json(
        { message: "거래중인 상품은 삭제할 수 없어요." },
        { status: 404 }
      );
    }

    if (product.status === ProductStatus.soldout) {
      return NextResponse.json(
        { message: "판매된 상품은 삭제할 수 없어요." },
        { status: 404 }
      );
    }

    const productImgNameArray = product.imgData.map(
      (data: ProductImgData) => data.name
    );

    try {
      const storage = await getStorageInstance();
      const removeImgPromise = productImgNameArray.map((name: string) => {
        return deleteObject(ref(storage, `images/product/${name}`));
      });

      await Promise.all(removeImgPromise);
    } catch (error) {
      console.error(error);
      console.log("상품 이미지 삭제에 실패했어요.");
    }

    // 유저의 productIds에서 제거
    const profileResult = await User.updateOne(
      { _id: new mongoose.Types.ObjectId(myUid) },
      {
        $pull: {
          productIds: new mongoose.Types.ObjectId(product._id as string)
        }
      },
      { session }
    );

    const wishDeleteResult = await Wish.deleteMany(
      { productId: new mongoose.Types.ObjectId(productId as string) },
      { session }
    );

    if (!wishDeleteResult.acknowledged) {
      throw new Error("상품 찜(Wish) 데이터 삭제에 실패했어요.");
    }

    // 상품 삭제
    const productResult = await Product.deleteOne(
      { _id: new mongoose.Types.ObjectId(productId as string) },
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

    // 판매 거래 정보 삭제
    const saleTradingDeleteResult = await SaleTrading.deleteOne(
      {
        productId: new mongoose.Types.ObjectId(productId as string),
        status: TradingStatus.TRADING
      },
      { session }
    );

    if (
      !saleTradingDeleteResult.acknowledged ||
      saleTradingDeleteResult.deletedCount === 0
    ) {
      throw new Error("상품 판매 거래 정보 삭제에 실패했어요.");
    }

    await session.commitTransaction();
    session.endSession();

    revalidatePath(`/product`);
    revalidatePath(`/product/${productId}`);

    return NextResponse.json(
      { message: "상품이 삭제됬어요." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      { message: "상품 삭제에 실패했어요.\n잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
