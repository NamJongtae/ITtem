import getProfileProductList from "@/domains/product/api/getProfileProductList";
import getFollowers from "@/domains/user/api/profile/getFollowers";
import getFollowings from "@/domains/user/api/profile/getFollowings";
import getMyProfile from "@/domains/user/api/profile/getMyProfile";
import getReceivedReviews from "@/domains/user/api/profile/getReceivedReviews";
import getUserProfile from "@/domains/user/api/profile/getUserProfile";
import getWishlistProductData from "@/domains/user/api/profile/getWishlistProductData";
import { ProductCategory } from "@/domains/product/types/product-types";
import { createQueryKeys } from "@lukemorales/query-key-factory";

const profileQueryKey = createQueryKeys("profile", {
  my: {
    queryKey: null,
    queryFn: async () => {
      const response = await getMyProfile();
      return response.data.profile;
    },
    contextQueries: {
      products: ({
        category = ProductCategory.전체,
        productIds,
        limit = 10
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
          const response = await getWishlistProductData({
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
          const response = getReceivedReviews({
            uid,
            cursor: pageParam,
            limit
          });
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
        category = ProductCategory.전체,
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
          const response = getReceivedReviews({
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

export default profileQueryKey;
