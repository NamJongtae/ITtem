import getProfileProductList from "@/domains/product/shared/api/getProfileProductList";
import getFollowers from "@/domains/user/profile/api/getFollowers";
import getFollowings from "@/domains/user/profile/api/getFollowings";
import getMyProfile from "@/domains/user/profile/api/getMyProfile";
import getReceivedReviews from "@/domains/user/profile/api/getReceivedReviews";
import getUserProfile from "@/domains/user/profile/api/getUserProfile";
import getWishlistProductData from "@/domains/user/profile/api/getWishlistProductData";
import { ProductCategory } from "@/domains/product/shared/types/productTypes";
import { createQueryKeys } from "@lukemorales/query-key-factory";

const profileQueryKey = createQueryKeys("profile", {
  my: {
    queryKey: null,
    queryFn: async () => {
      const response = await getMyProfile();
      return response.profile;
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
      followers: ({ uid, limit = 10 }: { uid: string; limit?: number }) => ({
        queryKey: ["list"] as const,
        queryFn: async ({ pageParam }) => {
          const response = await getFollowers({
            cursor: pageParam,
            limit,
            uid
          });
          return response.data.followers;
        }
      }),
      followings: ({ uid, limit = 10 }: { uid: string; limit?: number }) => ({
        queryKey: ["list"] as const,
        queryFn: async ({ pageParam }) => {
          const response = await getFollowings({
            cursor: pageParam,
            limit,
            uid
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
      return response.profile;
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
      followers: ({ uid, limit = 10 }: { uid: string; limit?: number }) => ({
        queryKey: ["list"] as const,
        queryFn: async ({ pageParam }) => {
          const response = await getFollowers({
            cursor: pageParam,
            limit,
            uid
          });
          return response.data.followers;
        }
      }),
      followings: ({ uid, limit = 10 }: { uid: string; limit?: number }) => ({
        queryKey: ["list"] as const,
        queryFn: async ({ pageParam }) => {
          const response = await getFollowings({
            cursor: pageParam,
            limit,
            uid
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
