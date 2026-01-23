import getProfileProductList from "@/domains/product/shared/api/getProfileProductList";
import getFollowers from "@/domains/user/profile/api/getFollowers";
import getFollowings from "@/domains/user/profile/api/getFollowings";
import getMyProfile from "@/domains/user/profile/api/getMyProfile";
import getReceivedReviews from "@/domains/user/profile/api/getReceivedReviews";
import getUserProfile from "@/domains/user/profile/api/getUserProfile";
import getWishlistProductData from "@/domains/user/profile/api/getWishlistProductData";
import { ProductCategory } from "@/domains/product/shared/types/productTypes";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import checkFollowStatus from "../api/checkFollowStatus";

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
        queryKey: [category, "list", limit] as const,
        queryFn: async ({ pageParam }) => {
          const response = await getProfileProductList({
            cursor: pageParam as string | null,
            category,
            limit,
            productIds
          });
          return response.data.products;
        }
      }),
      followers: ({ uid, limit = 10 }: { uid: string; limit?: number }) => ({
        queryKey: ["list", limit] as const,
        queryFn: async ({ pageParam }) => {
          const response = await getFollowers({
            cursor: pageParam as string | null,
            limit,
            uid
          });
          return response.data.followers;
        }
      }),
      followings: ({ uid, limit = 10 }: { uid: string; limit?: number }) => ({
        queryKey: ["list", limit] as const,
        queryFn: async ({ pageParam }) => {
          const response = await getFollowings({
            cursor: pageParam as string | null,
            limit,
            uid
          });
          return response.data.followings;
        }
      }),
      wish: ({ limit = 10 }: { limit?: number } = {}) => ({
        queryKey: ["list", limit] as const,
        queryFn: async ({ pageParam }) => {
          const response = await getWishlistProductData({
            cursor: pageParam as string | null,
            limit
          });
          return response.data.products;
        }
      }),
      reviews: ({ uid, limit = 10 }: { uid: string; limit: number }) => ({
        queryKey: ["list", limit] as const,
        queryFn: async ({ pageParam }) => {
          const response = await getReceivedReviews({
            uid,
            cursor: pageParam as string | null,
            limit
          });
          return response.data.reviews;
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
            cursor: pageParam as string | null,
            category,
            limit,
            productIds
          });
          return response.data.products;
        }
      }),
      isFollow: {
        queryKey: null,
        queryFn: async () => {
          const data = await checkFollowStatus(userId);
          return data.isFollow;
        }
      },
      followers: ({ uid, limit = 10 }: { uid: string; limit?: number }) => ({
        queryKey: ["list", limit] as const,
        queryFn: async ({ pageParam }) => {
          const response = await getFollowers({
            cursor: pageParam as string | null,
            limit,
            uid
          });
          return response.data.followers;
        }
      }),
      followings: ({ uid, limit = 10 }: { uid: string; limit?: number }) => ({
        queryKey: ["list", limit] as const,
        queryFn: async ({ pageParam }) => {
          const response = await getFollowings({
            cursor: pageParam as string | null,
            limit,
            uid
          });
          return response.data.followings;
        }
      }),
      reviews: ({ limit = 10 }: { limit: number }) => ({
        queryKey: ["list", limit] as const,
        queryFn: async ({ pageParam }) => {
          const response = getReceivedReviews({
            uid: userId,
            cursor: pageParam as string | null,
            limit
          });
          return (await response).data.reviews;
        }
      })
    }
  })
});

export default profileQueryKey;
