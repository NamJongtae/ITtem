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

    const cursorDate = cursor ? new Date(cursor) : new Date();
    const currentLimit = Math.max(parseInt(limit ?? "12", 10) || 12, 1);

    const query: Record<string, unknown> = {
      block: false,
      createdAt: { $lt: cursorDate }
    };

    if (category && category !== "전체") {
      query.category = category;
    }

    if (location) {
      query.location = new RegExp(location, "i");
    }

    const products = await Product.find(query)
      .select(
        "_id name description uid createdAt status block imgData price location sellType category"
      )
      .sort({ createdAt: -1, _id: -1 })
      .limit(currentLimit)
      .lean();

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
