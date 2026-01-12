import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/shared/common/utils/db/db";
import mongoose from "mongoose";
import Product from "@/domains/product/shared/models/Product";
import Wish from "@/domains/product/shared/models/Wish";
import checkAuthorization from "@/domains/auth/shared/common/utils/checkAuthorization";
import * as Sentry from "@sentry/nextjs";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string | undefined }> }
) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const isValidAuth = await checkAuthorization();
    if (!isValidAuth?.isValid) {
      return NextResponse.json(
        { message: isValidAuth?.message },
        { status: 401 }
      );
    }

    const { productId } = await params;
    const myUid = isValidAuth?.auth?.uid;

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

    await dbConnect();

    // 상품 존재 확인
    const product = await Product.findOne({
      _id: new mongoose.Types.ObjectId(productId)
    }).session(session);

    if (!product) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "상품이 존재하지 않아요." },
        { status: 404 }
      );
    }

    // Wish 생성 (중복이면 에러)
    try {
      await Wish.create(
        [
          {
            userId: new mongoose.Types.ObjectId(myUid),
            productId: new mongoose.Types.ObjectId(productId)
          }
        ],
        { session }
      );
    } catch (e: any) {
      if (e?.code === 11000) {
        await session.abortTransaction();
        session.endSession();
        return NextResponse.json(
          { message: "이미 찜한 상품이에요." },
          { status: 409 }
        );
      }
      throw e;
    }

    // Wish가 생성됐을 때 카운트 증가
    const productResult = await Product.updateOne(
      { _id: new mongoose.Types.ObjectId(productId) },
      { $inc: { wishCount: 1 } },
      { session }
    );

    if (!productResult.acknowledged || productResult.modifiedCount === 0) {
      throw new Error("상품 wishCount 증가에 실패했어요.");
    }

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({ message: "상품을 찜했어요." }, { status: 200 });
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      { message: "상품 찜에 실패했어요.\n잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string | undefined }> }
) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const isValidAuth = await checkAuthorization();
    if (!isValidAuth?.isValid) {
      return NextResponse.json(
        { message: isValidAuth?.message },
        { status: 401 }
      );
    }

    const { productId } = await params;
    const myUid = isValidAuth?.auth?.uid;

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

    await dbConnect();

    // Wish 삭제 (삭제된 경우에만 카운트 감소)
    const deleteResult = await Wish.deleteOne(
      {
        userId: new mongoose.Types.ObjectId(myUid),
        productId: new mongoose.Types.ObjectId(productId)
      },
      { session }
    );

    if (!deleteResult.acknowledged) {
      throw new Error("Wish 삭제 요청이 정상 처리되지 않았어요.");
    }

    if (deleteResult.deletedCount === 0) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "찜한 상품이 아니에요." },
        { status: 409 }
      );
    }

    const productResult = await Product.updateOne(
      { _id: new mongoose.Types.ObjectId(productId) },
      { $inc: { wishCount: -1 } },
      { session }
    );

    if (!productResult.acknowledged || productResult.modifiedCount === 0) {
      throw new Error("상품 wishCount 감소에 실패했어요.");
    }

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json(
      { message: "상품 찜 삭제에 성공했어요." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      { message: "상품 찜 삭제에 실패했어요.\n잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
