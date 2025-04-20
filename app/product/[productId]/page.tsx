import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from "@tanstack/react-query";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/server";
import { getProduct, incrementViewCount } from "@/lib/api/product";
import customAxios from "@/lib/customAxios";
import { queryKeys } from "@/query-keys/query-keys";
import { IronSessionData } from "@/types/api-types";
import ProductDetailPage from "@/components/product-detail/product-detail-page";
import { BASE_URL } from "@/constants/constant";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params
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
      title
    }
  };
}

async function fetchProductData({
  productId,
  queryClient
}: {
  productId: string;
  queryClient: QueryClient;
}) {
  const productQueryKeyConfing = queryKeys.product.detail(productId);

  await queryClient.prefetchQuery({
    queryKey: productQueryKeyConfing.queryKey,
    queryFn: productQueryKeyConfing.queryFn
  });
}

async function fetchProfileData() {
  const session = await getIronSession<IronSessionData>(
    cookies(),
    sessionOptions
  );
  const sessionCookie = cookies().get("session");
  const cookieHeader = sessionCookie
    ? `${sessionCookie.name}=${sessionCookie.value}`
    : "";
  if (session.refreshToken) {
    try {
      const response = await customAxios("/api/profile", {
        headers: {
          Cookie: cookieHeader
        }
      });
      return response.data.profile;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Expired AccessToken.") {
          const { cookies } = await import("next/headers");
          const cookie = cookies();
          const currentURL = cookie.get("X-Requested-URL")?.value || "/";
          redirect(`${BASE_URL}/refresh-token?next=${currentURL}`);
        }
      }
    }
  }
}

export default async function ProductDetail({
  params
}: {
  params: { productId: string | undefined };
}) {
  const myProfileQueryKeyConfig = queryKeys.profile.my;
  const queryClient = new QueryClient();
  const productId = params?.productId;

  if (productId) {
    await incrementViewCount(productId);
    await Promise.all([
      fetchProductData({ productId, queryClient }),
      queryClient.fetchQuery({
        queryKey: myProfileQueryKeyConfig.queryKey,
        queryFn: fetchProfileData
      })
    ]);
  }

  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductDetailPage />
      </HydrationBoundary>
    </Suspense>
  );
}
