import dbConnect from "@/shared/common/utils/db/db";
import RecommendProduct from "@/domains/product/shared/models/RecommendProduct";
import { unstable_cache } from "next/cache";
import * as Sentry from "@sentry/nextjs";
import { ProductData } from "@/domains/product/shared/types/productTypes";

type RecommendProductsResult = {
  products: ProductData[];
  nextCursor: string | null;
};

export const getRecommendProductsServer = unstable_cache(
  async (limit: number): Promise<RecommendProductsResult> => {
    try {
      await dbConnect();

      const pageLimit = limit ? limit : 12;

      const recommendDocs = await RecommendProduct.find({})
        .sort({ createdAt: -1 })
        .limit(pageLimit)
        .populate({
          path: "productId",
          match: { block: false },
          select:
            "_id name description uid createdAt status block imgData price location sellType category"
        })
        .lean();

      const products = recommendDocs
        .map((d: any) => d.productId)
        .filter(Boolean);

      const nextCursor =
        recommendDocs.length > 0
          ? new Date(
              recommendDocs[recommendDocs.length - 1].createdAt
            ).toISOString()
          : null;

      return JSON.parse(
        JSON.stringify({
          products: products,
          nextCursor: nextCursor
        })
      );
    } catch (error) {
      console.error(error);
      Sentry.captureException(error);
      throw new Error(
        "추천 상품 조회에 실패했어요. 잠시 후 다시 시도해주세요."
      );
    }
  },
  ["product-recommend"],
  {
    revalidate: 60 * 60 * 24,
    tags: ["product-recommend"]
  }
);
