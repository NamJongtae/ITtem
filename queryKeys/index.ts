import { ProductManageMenu } from "@/components/product-manage/product-manage-page";
import {
  getFollowers,
  getFollowings,
  getMyProfile,
  getProfileReviews,
  getProfileWish,
  getSessionCookies,
  getUser,
  getUserProfile,
} from "@/lib/api/auth";
import { getNotificationMessage } from "@/lib/api/notification";
import {
  getCategoryProductList,
  getProduct,
  getProfileProductList,
  getPurchaseTrading,
  getReview,
  getSalesTrading,
  getSearchProductList,
  getTodayProductList,
} from "@/lib/api/product";
import { ProductCategory, ProductListType } from "@/types/productTypes";
import {
  createQueryKeys,
  mergeQueryKeys,
} from "@lukemorales/query-key-factory";

export const authQueryKey = createQueryKeys("auth", {
  info: (userId?: string) => ({
    queryKey: [userId],
    queryFn: getUser,
  }),
});

export const productQueryKey = createQueryKeys("product", {
  list: ({
    productListType,
    produdctCategory,
    location,
    limit,
  }: {
    productListType?: ProductListType;
    produdctCategory?: ProductCategory;
    location?: string;
    limit: number;
  }) => ({
    queryKey: productListType
      ? [productListType]
      : produdctCategory && location
      ? [produdctCategory, location]
      : [produdctCategory],
    queryFn: produdctCategory
      ? async ({ pageParam }) => {
          const response = await getCategoryProductList({
            category: produdctCategory,
            cursor: pageParam,
            limit,
            location,
          });
          return response.data.products;
        }
      : async ({ pageParam }) => {
          const response = await getTodayProductList(pageParam, limit);
          return response.data.products;
        },
  }),
  search: ({
    keyword,
    category,
    limit,
  }: {
    keyword?: string;
    category: ProductCategory;
    limit: number;
  }) => ({
    queryKey: [keyword, category],
    queryFn: async ({ pageParam }) => {
      const response = await getSearchProductList({
        category,
        cursor: pageParam,
        limit,
        keyword: (keyword as string) || "",
      });
      return response.data.products;
    },
  }),
  detail: (productId: string) => ({
    queryKey: [productId],
    queryFn: async () => {
      const response = await getProduct(productId);
      return response.data.product;
    },
  }),
  review: (productId: string) => ({
    queryKey: [productId],
    queryFn: async () => {
      const response = await getReview(productId);
      return response.data.review;
    },
  }),
  manage: ({
    currentMenu,
    status,
    search,
    menu,
    limit,
  }: {
    currentMenu: "sale" | "purchase";
    status: string;
    search: string | undefined;
    menu: ProductManageMenu;
    limit: number;
  }) => ({
    queryKey: [currentMenu, status, search],
    queryFn: async ({ pageParam }) => {
      if (menu === "판매") {
        const response = await getSalesTrading({
          status,
          cursor: pageParam,
          search,
          limit,
        });
        return response.data.saleTrading;
      } else {
        const response = await getPurchaseTrading({
          status,
          cursor: pageParam,
          search,
          limit,
        });
        return response.data.purchaseTrading;
      }
    },
  }),
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
        limit,
        productIds,
      }: {
        category: ProductCategory;
        limit: number;
        productIds: string[];
      }) => ({
        queryKey: [category],
        queryFn: async ({ pageParam }) => {
          const response = await getProfileProductList({
            cursor: pageParam,
            category,
            limit,
            productIds,
          });
          return response.data.products;
        },
      }),
      followers: ({
        userIds,
        limit,
      }: {
        userIds: string[];
        limit: number;
      }) => ({
        queryKey: [] as any,
        queryFn: async ({ pageParam }) => {
          const response = await getFollowers({
            cursor: pageParam,
            limit,
            userIds,
          });
          return response.data.followers;
        },
      }),
      followings: ({
        userIds,
        limit,
      }: {
        userIds: string[];
        limit: number;
      }) => ({
        queryKey: [] as any,
        queryFn: async ({ pageParam }) => {
          const response = await getFollowings({
            cursor: pageParam,
            limit,
            userIds,
          });
          return response.data.followings;
        },
      }),
      wish: ({
        wishProductIds,
        limit,
      }: {
        wishProductIds: string[];
        limit: number;
      }) => ({
        queryKey: ["wish"],
        queryFn: async ({ pageParam }) => {
          const response = await getProfileWish({
            wishProductIds,
            cursor: pageParam,
            limit,
          });
          return response.data.products;
        },
      }),
      reviews: ({ uid, limit }: { uid: string; limit: number }) => ({
        queryKey: [] as any,
        queryFn: async ({ pageParam }) => {
          const response = getProfileReviews({ uid, cursor: pageParam, limit });
          return (await response).data.reviews;
        },
      }),
    },
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
        limit,
        productIds,
      }: {
        category: ProductCategory;
        limit: number;
        productIds: string[];
      }) => ({
        queryKey: [category],
        queryFn: async ({ pageParam }) => {
          const response = await getProfileProductList({
            cursor: pageParam,
            category,
            limit,
            productIds,
          });
          return response.data.products;
        },
      }),
      followers: ({
        userIds,
        limit,
      }: {
        userIds: string[];
        limit: number;
      }) => ({
        queryKey: [] as any,
        queryFn: async ({ pageParam }) => {
          const response = await getFollowers({
            cursor: pageParam,
            limit,
            userIds,
          });
          return response.data.followers;
        },
      }),
      followings: ({
        userIds,
        limit,
      }: {
        userIds: string[];
        limit: number;
      }) => ({
        queryKey: [] as any,
        queryFn: async ({ pageParam }) => {
          const response = await getFollowings({
            cursor: pageParam,
            limit,
            userIds,
          });
          return response.data.followings;
        },
      }),
      reviews: ({ uid, limit }: { uid: string; limit: number }) => ({
        queryKey: [] as any,
        queryFn: async ({ pageParam }) => {
          const response = getProfileReviews({ uid, cursor: pageParam, limit });
          return (await response).data.reviews;
        },
      }),
    },
  }),
});

export const sessionQueryKey = createQueryKeys("session", {
  isExist: {
    queryKey: null,
    queryFn: getSessionCookies,
  },
});

export const notificationQueryKey = createQueryKeys("notification", {
  messages: (limit: number) => ({
    queryKey: [] as any,
    queryFn: async ({ pageParam }) => {
      const response = await getNotificationMessage({
        lastKey: pageParam,
        limit,
      });

      return {
        messages: response.data.messages,
        nextKey: response.data.nextKey,
      };
    },
  }),
});

export const queryKeys = mergeQueryKeys(
  authQueryKey,
  productQueryKey,
  profileQueryKey,
  sessionQueryKey,
  notificationQueryKey
);
