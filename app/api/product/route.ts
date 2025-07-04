import dbConnect from "@/shared/common/utils/db/db";
import Product from "@/domains/product/shared/models/Product";
import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get("category");
  const cursor = searchParams.get("cursor");
  const limit = searchParams.get("limit");
  const location = searchParams.get("location");

  try {
    await dbConnect();

    const todayStart = new Date();

    const cursorDate = cursor ? new Date(cursor as string) : todayStart;
    const currentLimit = parseInt(limit as string) || 10;

    let query: object = { createdAt: { $lt: cursorDate }, block: false };
    query = category !== "전체" ? { category } : query;
    query = location
      ? { ...query, location: new RegExp(location as string, "i") }
      : query;

    const products = await Product.find(query)
      .select(
        "_id name description uid createdAt status block imgData price location sellType category"
      )
      .limit(currentLimit)
      .sort({ createdAt: -1, _id: -1 });

    return NextResponse.json(
      { message: "상품 조회에 성공 했어요.", products },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json(
      { message: "상품 조회에 실패했어요." },
      { status: 500 }
    );
  }
}
