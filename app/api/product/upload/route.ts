import { NextRequest, NextResponse } from "next/server";
import Product from "@/domains/product/shared/models/Product";
import SaleTrading from "@/domains/product/shared/models/SaleTrading";
import User from "@/domains/auth/shared/common/models/User";
import checkAuthorization from "@/domains/auth/shared/common/utils/checkAuthorization";
import mongoose from "mongoose";
import * as Sentry from "@sentry/nextjs";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  let session: mongoose.ClientSession | null = null;

  try {
    const isValidAuth = await checkAuthorization();

    if (!isValidAuth.isValid) {
      return NextResponse.json(
        {
          message: isValidAuth.message
        },
        { status: 401 }
      );
    }

    const { productData } = await req.json();

    const myUid = isValidAuth?.auth?.uid;

    session = await mongoose.startSession();
    session.startTransaction();

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

    // 상품 페이지 재검증
    revalidatePath(`/product`);

    return NextResponse.json(
      {
        message: "상품 등록에 성공했어요.",
        product: newProduct
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);

    if (session) {
      await session.abortTransaction();
      session.endSession();
    }

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
