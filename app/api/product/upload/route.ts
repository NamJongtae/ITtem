import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/shared/common/utils/db/db";
import Product from "@/domains/product/shared/models/Product";
import SaleTrading from "@/domains/product/shared/models/SaleTrading";
import User from "@/domains/auth/shared/common/models/User";
import checkAuthorization from "@/domains/auth/shared/common/utils/checkAuthorization";
import mongoose from "mongoose";
import * as Sentry from "@sentry/nextjs";

export async function POST(req: NextRequest) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const isValidAuth = await checkAuthorization();

    if (!isValidAuth.isValid) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        {
          message: isValidAuth.message
        },
        { status: 401 }
      );
    }

    const { productData } = await req.json();

    const myUid = isValidAuth?.auth?.uid;

    await dbConnect();

    const newProduct = new Product(productData);

    await newProduct.save({ session });

    const updateResult = await User.updateOne(
      { _id: new mongoose.Types.ObjectId(myUid) },
      { $push: { productIds: newProduct._id } },
      { session }
    );

    if (!updateResult.acknowledged || updateResult.modifiedCount === 0) {
      throw new Error("유저에 상품 ID 등록에 실패했어요.");
    }

    const saleTrading = new SaleTrading({
      sellerId: newProduct.uid,
      productId: newProduct._id,
      productName: newProduct.name,
      productPrice: newProduct.price,
      productImg: newProduct.imgData[0].url,
      saleStartDate: newProduct.createdAt
    });

    await saleTrading.save({ session });

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json(
      {
        message: "상품 등록에 성공했어요.",
        product: newProduct
      },
      { status: 201 }
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    Sentry.captureException(error);
    if (error instanceof mongoose.Error.ValidationError) {
      const errorMessages = Object.values(error.errors).map(
        (err) => err.message
      );
      return NextResponse.json(
        {
          message: "유효하지 않은 값이 있어요.",
          error: errorMessages
        },
        { status: 422 }
      );
    }
    return NextResponse.json(
      {
        message: "상품 등록에 실패하였어요.\n잠시 후 다시 시도해주세요."
      },
      { status: 500 }
    );
  }
}
