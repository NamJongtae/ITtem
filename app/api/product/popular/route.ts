import dbConnect from "@/lib/db/db";
import Product from "@/lib/db/models/Product";
import { ProductStatus } from "@/types/product-types";

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
    return new Response(
      JSON.stringify({
        message: "인기 상품 조회에 실패했어요.\n잠시 후 다시 시도해주세요"
      }),
      { status: 500 }
    );
  }
}
