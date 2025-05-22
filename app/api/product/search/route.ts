import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db/db";
import Product, { ProductDB } from "@/domains/product/models/Product";
import { FilterQuery } from "mongoose";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const cursor = searchParams.get("cursor");
  const limit = searchParams.get("limit");
  const category = searchParams.get("category");
  const keyword = searchParams.get("keyword");

  try {
    await dbConnect();

    const todayStart = new Date();
    const cursorDate = cursor ? new Date(cursor) : todayStart;
    const currentLimit = parseInt(limit || "10");

    let query: FilterQuery<ProductDB> = {
      createdAt: { $lt: cursorDate },
      block: false
    };

    if (category && category !== "전체") {
      query = { ...query, category };
    }

    if (keyword) {
      const keywords = keyword.split(/\s+/); // 공백을 기준으로 분리
      query = {
        ...query,
        $or: [
          { name: { $in: keywords.map((kw) => new RegExp(kw, "i")) } }, // 대소문자 구분 없이 검색
          { location: { $in: keywords.map((kw) => new RegExp(kw, "i")) } }
        ]
      };
    } else {
      return NextResponse.json(
        { message: "검색어가 존재하지 않아요." },
        { status: 422 }
      );
    }

    const products = await Product.find(query)
      .select(
        "_id name description uid createdAt status block imgData price location sellType category"
      )
      .limit(currentLimit)
      .sort({ createdAt: -1, _id: -1 });

    return NextResponse.json(
      { message: "검색에 성공했어요.", products },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "검색에 실패했어요.\n잠시 후 다시 시도해주세요" },
      { status: 500 }
    );
  }
}
