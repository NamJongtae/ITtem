import dbConnect from "@/shared/common/utils/db/db";
import Product from "@/domains/product/shared/models/Product";
import RecommendProduct from "@/domains/product/shared/models/RecommendProduct";
import { ProductStatus } from "@/domains/product/shared/types/productTypes";
import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const limit = searchParams.get("limit");
  const cursor = searchParams.get("cursor");

  try {
    await dbConnect();

    const cursorDate = cursor ? new Date(cursor) : new Date();
    const pageLimit = Math.max(parseInt(limit ?? "10", 10) || 10, 1);

    const recommendDocs = await RecommendProduct.find({
      createdAt: { $lt: cursorDate }
    })
      .sort({ createdAt: -1 })
      .limit(pageLimit)
      .populate({
        path: "productId",
        match: { block: false },
        select:
          "_id name description uid createdAt status block imgData price location sellType category"
      })
      .lean();

    const products = recommendDocs.map((d: any) => d.productId).filter(Boolean);

    return NextResponse.json(
      {
        message: "추천 상품 조회에 성공했어요.",
        products
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json(
      {
        message: "추천 상품 조회에 실패했어요. 잠시 후 다시 시도해주세요."
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    await RecommendProduct.deleteMany({});

    const docs = await Product.aggregate([
      { $match: { block: false, status: ProductStatus.sold } },
      { $sample: { size: 100 } },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          createdAt: 1
        }
      }
    ]);

    await RecommendProduct.insertMany(docs);

    return NextResponse.json(
      { message: "추천 상품이 새로 갱신되었어요.", count: docs.length },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json(
      { message: "추천 상품 갱신에 실패했어요.\n잠시 후 다시 시도해주세요" },
      { status: 500 }
    );
  }
}
