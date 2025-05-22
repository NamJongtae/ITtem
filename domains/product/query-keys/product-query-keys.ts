import getCategoryProductList from "@/domains/product/api/getCategoryProductList";
import getPopularProductList from "@/domains/product/api/getPopularProductList";
import getProduct from "@/domains/product/api/getProduct";
import getProductReview from "@/domains/product/api/getProductReview";
import getRecommendProductList from "@/domains/product/api/getRecommendProductList";
import getSearchProductList from "@/domains/product/api/getSearchProductList";
import getPurchaseTrading from "@/domains/product/api/manage/getPurchaseTrading";
import getSalesTrading from "@/domains/product/api/manage/getSalesTrading";
import {
  ProductCategory,
  ProductManageMenuType
} from "@/domains/product/types/product-types";
import { createQueryKeys } from "@lukemorales/query-key-factory";

const productQueryKey = createQueryKeys("product", {
  popular: {
    queryKey: ["list"] as const,
    queryFn: async () => {
      const response = await getPopularProductList();
      return response.data.products;
    }
  },
  recommend: (limit: number = 10) => ({
    queryKey: ["list"] as const,
    queryFn: async ({ pageParam }) => {
      const response = await getRecommendProductList(pageParam, limit);
      return response.data.products;
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
        cursor: pageParam
      });
      return response.data.products;
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
      return response.data.product;
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
