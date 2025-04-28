import { ProductManageMenu } from "@/components/product-manage/product-manage-page";
import { getSessionCookies, getUser } from "@/lib/api/auth";
import { getNotificationMessage } from "@/lib/api/notification";
import {
  getCategoryProductList,
  getPopularProductList,
  getProduct,
  getProfileProductList,
  getRecommendProductList,
  getReview,
  getSearchProductList
} from "@/lib/api/product";
import {
  getFollowers,
  getFollowings,
  getMyProfile,
  getProfileReviews,
  getProfileWish,
  getUserProfile
} from "@/lib/api/profile";
import { getPurchaseTrading, getSalesTrading } from "@/lib/api/trading";
import { ProductCategory } from "@/types/product-types";
import {
  createQueryKeys,
  mergeQueryKeys
} from "@lukemorales/query-key-factory";

export const authQueryKey = createQueryKeys("auth", {
  info: {
    queryKey: null,
    queryFn: getUser
  }
});

export const productQueryKey = createQueryKeys("product", {
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
      const response = await getReview(productId);
      return response.data.review;
    }
  }),
  manage: ({
    currentMenu,
    status,
    search,
    menu,
    limit = 10
  }: {
    currentMenu: "sale" | "purchase";
    status: string;
    search: string | undefined;
    menu: ProductManageMenu;
    limit?: number;
  }) => ({
    queryKey: [currentMenu, status, search] as const,
    queryFn: async ({ pageParam }) => {
      if (menu === "판매") {
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

export const profileQueryKey = createQueryKeys("profile", {
  my: {
    queryKey: null,
    queryFn: async () => {
      const response = await getMyProfile();
      return response.data.profile;
    },
    contextQueries: {
      products: ({
        category,
        limit = 10,
        productIds
      }: {
        category: ProductCategory;
        productIds: string[];
        limit?: number;
      }) => ({
        queryKey: [category, "list"] as const,
        queryFn: async ({ pageParam }) => {
          const response = await getProfileProductList({
            cursor: pageParam,
            category,
            limit,
            productIds
          });
          return response.data.products;
        }
      }),
      followers: ({
        userIds,
        limit = 10
      }: {
        userIds: string[];
        limit?: number;
      }) => ({
        queryKey: ["list"] as const,
        queryFn: async ({ pageParam }) => {
          const response = await getFollowers({
            cursor: pageParam,
            limit,
            userIds
          });
          return response.data.followers;
        }
      }),
      followings: ({
        userIds,
        limit = 10
      }: {
        userIds: string[];
        limit?: number;
      }) => ({
        queryKey: ["list"] as const,
        queryFn: async ({ pageParam }) => {
          const response = await getFollowings({
            cursor: pageParam,
            limit,
            userIds
          });
          return response.data.followings;
        }
      }),
      wish: ({
        wishProductIds,
        limit = 10
      }: {
        wishProductIds: string[];
        limit?: number;
      }) => ({
        queryKey: ["list"] as const,
        queryFn: async ({ pageParam }) => {
          const response = await getProfileWish({
            wishProductIds,
            cursor: pageParam,
            limit
          });
          return response.data.products;
        }
      }),
      reviews: ({ uid, limit = 10 }: { uid: string; limit: number }) => ({
        queryKey: ["list"] as const,
        queryFn: async ({ pageParam }) => {
          const response = getProfileReviews({ uid, cursor: pageParam, limit });
          return (await response).data.reviews;
        }
      })
    }
  },
  user: (userId: string) => ({
    queryKey: [userId],
    queryFn: async () => {
      const response = await getUserProfile(userId);
      return response.data.profile;
    },
    contextQueries: {
      products: ({
        category,
        limit = 10,
        productIds
      }: {
        category: ProductCategory;
        productIds: string[];
        limit?: number;
      }) => ({
        queryKey: [category, "list"] as const,
        queryFn: async ({ pageParam }) => {
          const response = await getProfileProductList({
            cursor: pageParam,
            category,
            limit,
            productIds
          });
          return response.data.products;
        }
      }),
      followers: ({
        userIds,
        limit = 10
      }: {
        userIds: string[];
        limit?: number;
      }) => ({
        queryKey: ["list"] as const,
        queryFn: async ({ pageParam }) => {
          const response = await getFollowers({
            cursor: pageParam,
            limit,
            userIds
          });
          return response.data.followers;
        }
      }),
      followings: ({
        userIds,
        limit = 10
      }: {
        userIds: string[];
        limit?: number;
      }) => ({
        queryKey: ["list"] as const,
        queryFn: async ({ pageParam }) => {
          const response = await getFollowings({
            cursor: pageParam,
            limit,
            userIds
          });
          return response.data.followings;
        }
      }),
      reviews: ({ limit = 10 }: { limit: number }) => ({
        queryKey: ["list"] as const,
        queryFn: async ({ pageParam }) => {
          const response = getProfileReviews({
            uid: userId,
            cursor: pageParam,
            limit
          });
          return (await response).data.reviews;
        }
      })
    }
  })
});

export const notificationQueryKey = createQueryKeys("notification", {
  messages: (limit: number = 10) => ({
    queryKey: ["list"] as const,
    queryFn: async ({ pageParam }) => {
      const response = await getNotificationMessage({
        lastKey: pageParam,
        limit
      });

      return {
        messages: response.data.messages,
        nextKey: response.data.nextKey
      };
    }
  })
});

export const sessionQueryKey = createQueryKeys("session", {
  isExist: {
    queryKey: null,
    queryFn: async () => {
      const response = await getSessionCookies();
      return response.data?.ok;
    }
  }
});

export const queryKeys = mergeQueryKeys(
  authQueryKey,
  productQueryKey,
  profileQueryKey,
  notificationQueryKey,
  sessionQueryKey
);
