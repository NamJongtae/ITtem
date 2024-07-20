import dbConnect from "@/lib/db";
import Product from "@/lib/db/models/Product";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = params;

    await dbConnect();

    if (!productId) {
      return NextResponse.json(
        { message: "상품 ID가 존재하지 않아요." },
        { status: 422 }
      );
    }

    const product = await Product.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(productId as string),
      },
      {
        $inc: { viewCount: 1 },
      },
      { returnNewDocument: true }
    );

    if (!product) {
      return NextResponse.json(
        { message: "상품이 존재하지 않아요." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "상품 조회수 갱신에 성공했어요." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "상품 조회수 갱신에 실패했어요." },
      { status: 500 }
    );
  }
}
