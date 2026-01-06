import getCategoryProductList from "@/domains/product/shared/api/getCategoryProductList";
import getPopularProductList from "@/domains/product/shared/api/getPopularProductList";
import getProduct from "@/domains/product/shared/api/getProduct";
import getProductReview from "../../manage/api/getProductReview";
import getRecommendProductList from "@/domains/product/shared/api/getRecommendProductList";
import getSearchProductList from "@/domains/product/shared/api/getSearchProductList";
import getPurchaseTrading from "@/domains/product/manage/api/getPurchaseTrading";
import getSalesTrading from "@/domains/product/manage/api/getSalesTrading";
import { ProductCategory } from "../types/productTypes";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { ProductManageMenuType } from "../../manage/types/productManageTypes";

const productQueryKey = createQueryKeys("product", {
  popular: {
    queryKey: ["list"] as const,
    queryFn: async () => {
      const response = await getPopularProductList();
      return response.products;
    }
  },
  recommend: (limit: number = 10) => ({
    queryKey: ["list"] as const,
    queryFn: async ({ pageParam }) => {
      const response = await getRecommendProductList(pageParam, limit);
      return response.products;
    }
  }),
  category: ({
    category,
    location,
    limit = 10
  }: {
    category: ProductCategory;
    location?: string;
    limit?: number;
  }) => ({
    queryKey: (() => {
      if (location) {
        return [category, location, "list"] as const;
      }
      return [category, "list"] as const;
    })(),
    queryFn: async ({ pageParam }) => {
      const response = await getCategoryProductList({
        category,
        location,
        limit,
        cursor: pageParam as string | null
      });
      return response.products;
    }
  }),
  search: ({
    keyword,
    category = ProductCategory.전체,
    limit = 10
  }: {
    keyword?: string;
    category?: ProductCategory;
    limit?: number;
  }) => ({
    queryKey: [keyword, category] as const,
    queryFn: async ({ pageParam }) => {
      const response = await getSearchProductList({
        category,
        cursor: pageParam,
        limit,
        keyword: (keyword as string) || ""
      });
      return response.data.products;
    }
  }),
  detail: (productId: string) => ({
    queryKey: [productId] as const,
    queryFn: async () => {
      const response = await getProduct(productId);
      return response.product;
    }
  }),
  review: (productId: string) => ({
    queryKey: [productId] as const,
    queryFn: async () => {
      const response = await getProductReview(productId);
      return response.data.review;
    }
  }),
  manage: ({
    status,
    search,
    menu,
    limit = 10
  }: {
    status: string;
    search: string | undefined;
    menu: ProductManageMenuType;
    limit?: number;
  }) => ({
    queryKey: [menu, status, search] as const,
    queryFn: async ({ pageParam }) => {
      if (menu === "sale") {
        const response = await getSalesTrading({
          status,
          cursor: pageParam,
          search,
          limit
        });
        return response.data.saleTrading;
      } else {
        const response = await getPurchaseTrading({
          status,
          cursor: pageParam,
          search,
          limit
        });
        return response.data.purchaseTrading;
      }
    }
  })
});

export default productQueryKey;
