import dbConnect from "@/shared/common/utils/db/db";
import Product from "../shared/models/Product";
import * as Sentry from "@sentry/nextjs";
import { unstable_cache } from "next/cache";
import { ProductData } from "@/domains/product/shared/types/productTypes";

type CategoryProductsResult = {
  products: ProductData[];
  nextCursor: string | null;
};
export const getCategoryProductsServer = ({
  category,
  limit = 12
}: {
  category: string;
  limit?: number;
}) =>
  unstable_cache(
    async (): Promise<CategoryProductsResult> => {
      try {
        await dbConnect();

        const cursorDate = new Date();

        const query: Record<string, unknown> = {
          block: false,
          createdAt: { $lt: cursorDate }
        };

        if (category !== "전체") query.category = category;

        const products = await Product.find(query)
          .select(
            "_id name description uid createdAt status block imgData price location sellType category"
          )
          .sort({ createdAt: -1, _id: -1 })
          .limit(limit)
          .lean<ProductData[]>();

        const nextCursor =
          products.length > 0
            ? new Date(products[products.length - 1].createdAt!).toISOString()
            : null;

        return { products, nextCursor };
      } catch (error) {
        console.error(error);
        Sentry.captureException(error);
        throw new Error("상품 조회에 실패했어요.");
      }
    },
    [`product-${category}`],
    {
      revalidate: 60,
      tags: ["products", `product-${category}`]
    }
  )();
