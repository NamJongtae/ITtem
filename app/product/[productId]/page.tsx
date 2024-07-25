import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/server";
import { getProduct, incrementViewCount } from "@/lib/api/product";
import customAxios from "@/lib/customAxios";
import { queryKeys } from "@/queryKeys";
import { IronSessionData } from "@/types/apiTypes";
import ProductDetailPage from "@/components/productDetail/product-detail";
import { BASE_URL } from "@/constants/constant";

export async function generateMetadata({
  params,
}: {
  params: { productId: string | undefined };
}) {
  const url = `${BASE_URL}/product/${params.productId}`;
  let title;

  if (params.productId) {
    try {
      const response = await getProduct(params.productId);
      const product = response.data.product;
      title = `ITtem | ${product.name}`;
    } catch (error) {
      console.error(error);
    }
  }

  return {
    metadataBase: new URL(url),
    title,
    openGraph: {
      url,
      title,
    },
  };
}

async function fetchProductData({
  productId,
  queryClient,
}: {
  productId: string;
  queryClient: QueryClient;
}) {
  const productQueryKeyConfing = queryKeys.product.detail(productId);
  
  await queryClient.prefetchQuery({
    queryKey: productQueryKeyConfing.queryKey,
    queryFn: productQueryKeyConfing.queryFn,
  });
}

async function fetchProfileData(queryClient: QueryClient) {
  const myProfileQueryKeyConfig = queryKeys.profile.my;

  const session = await getIronSession<IronSessionData>(
    cookies(),
    sessionOptions
  );

  if (session.refreshToken) {
    await queryClient.prefetchQuery({
      queryKey: myProfileQueryKeyConfig.queryKey,
      queryFn: async () => {
        try {
          const response = await customAxios("/api/profile", {
            headers: {
              Cookie: cookies() as any,
            },
          });
          return response.data.profile;
        } catch (error) {
          queryClient.removeQueries({
            queryKey: myProfileQueryKeyConfig.queryKey,
          });
          throw error;
        }
      },
    });
  }
}

export default async function ProductDetail({
  params,
}: {
  params: { productId: string | undefined };
}) {
  const queryClient = new QueryClient();
  const productId = params?.productId;

  if (productId) {
    try {
      await incrementViewCount(productId);
      await Promise.all([
        fetchProductData({ productId, queryClient }),
        fetchProfileData(queryClient),
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailPage />
    </HydrationBoundary>
  );
}
