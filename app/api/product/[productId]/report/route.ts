import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import mongoose from "mongoose";
import Product from "@/lib/db/models/Product";
import { checkAuthorization } from "@/lib/server";
import { ProductStatus } from "@/types/productTypes";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { productId: string | undefined } }
) {
  try {
    const isValidAuth = await checkAuthorization();

    if (!isValidAuth.isValid) {
      return NextResponse.json(
        {
          message: isValidAuth.message,
        },
        { status: 401 }
      );
    }

    const { productId } = params;

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

    const product = await Product.findOne({
      _id: new mongoose.Types.ObjectId(productId as string),
    });

    if (!product) {
      return NextResponse.json(
        { message: "상품이 존재하지 않아요." },
        { status: 404 }
      );
    }

    if (product.status === ProductStatus.soldout) {
      return NextResponse.json(
        { message: "이미 판매된 상품은 신고할 수 없어요." },
        { status: 409 }
      );
    }

    if (product.reportUserIds.includes(myUid)) {
      return NextResponse.json(
        { message: "이미 신고한 상품이에요." },
        { status: 409 }
      );
    }

    if (product.uid === myUid) {
      return NextResponse.json(
        { message: "본인 상품은 신고할 수 없어요." },
        { status: 409 }
      );
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      {
        $inc: { reportCount: 1 },
        $push: { reportUserIds: myUid },
        $set: {
          block: product.reportCount >= 4,
        },
      },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        {
          message: "상품 신고에 실패했어요.\n잠시 후 다시 시도해주세요.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: updatedProduct.block
          ? "상품 신고가 누적되어 블라인드 처리되었어요."
          : "해당 상품을 신고했어요.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "상품 신고에 실패했어요.\n잠시 후 다시 시도해주세요.",
      },
      { status: 500 }
    );
  }
}
