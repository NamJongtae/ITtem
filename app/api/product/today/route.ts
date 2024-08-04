import dbConnect from "@/lib/db/db";
import Product from "@/lib/db/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParams = req.nextUrl.searchParams;
  const cursor = searchParams.get("cursor");
  const limit = searchParams.get("limit");

  try {
    await dbConnect();

    const pageLimit = parseInt(limit as string, 10) || 10;

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const cursorDate = cursor ? new Date(cursor as string) : todayEnd;

    const products = await Product.find({
      createdAt: { $gte: todayStart, $lt: cursorDate },
      block: false,
    })
      .select(
        "_id name description uid createdAt status block imgData price location sellType category"
      )
      .limit(pageLimit)
      .sort({ createdAt: -1, _id: -1 });

    return new Response(
      JSON.stringify({ message: "상품 조회에 성공했어요.", products }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "상품 조회에 실패했어요.\n잠시 후 다시 시도해주세요",
      }),
      { status: 500 }
    );
  }
}
