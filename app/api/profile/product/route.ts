import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db/db";
import Product from "@/domains/product/models/Product";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    const { productIds } = await req.json();
    const { searchParams } = req.nextUrl;
    const cursor = searchParams.get("cursor");
    const limit = searchParams.get("limit");
    const category = searchParams.get("category");

    if (!productIds) {
      return NextResponse.json(
        { message: "유저 상품 ID 목록이 없어요." },
        { status: 422 }
      );
    }

    await dbConnect();

    const todayStart = new Date();
    const cursorDate = cursor ? new Date(cursor as string) : todayStart;
    const pageLimit = parseInt(limit as string, 10) || 10;
    const objectIdArray = productIds.map(
      (id: string) => new mongoose.Types.ObjectId(id)
    );

    let query: object = {
      _id: { $in: objectIdArray },
      createdAt: { $lt: cursorDate },
      block: false
    };

    query = category !== "전체" ? { ...query, category } : query;

    const products = await Product.find(query)
      .select(
        "_id name description uid createdAt status block imgData price location sellType category"
      )
      .limit(pageLimit)
      .sort({ createdAt: -1, _id: -1 });

    return NextResponse.json({
      message: "유저 상품 목록 조회에 성공했어요.",
      products
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "유저 상품 목록 조회에 실패했어요.\n잠시 후 다시 시도해주세요."
      },
      { status: 500 }
    );
  }
}
