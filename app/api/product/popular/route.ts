import dbConnect from "@/shared/common/utils/db/db";
import Product from "@/domains/product/shared/models/Product";
import { ProductStatus } from "@/domains/product/shared/types/productTypes";
import * as Sentry from "@sentry/nextjs";

export async function GET() {
  try {
    await dbConnect();

    const products = await Product.find({
      block: false,
      status: ProductStatus.sold
    })
      .select(
        "_id name description uid createdAt status block imgData price location sellType category"
      )
      .sort({ viewCount: -1 })
      .limit(12);

    return new Response(
      JSON.stringify({ message: "인기 상품 조회에 성공했어요.", products }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    return new Response(
      JSON.stringify({
        message: "인기 상품 조회에 실패했어요.\n잠시 후 다시 시도해주세요"
      }),
      { status: 500 }
    );
  }
}
