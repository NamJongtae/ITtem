import { BASE_URL } from "@/constants/constant";
import { incrementViewCount } from "@/lib/api/product";
import customAxios from "@/lib/customAxios";
import { sessionOptions } from "@/lib/server";
import { queryKeys } from "@/query-keys/query-keys";
import { IronSessionData } from "@/types/api-types";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import { getIronSession } from "iron-session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ProductDetailPage from "./product-detail-page";

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
    await cookies(),
    sessionOptions
  );
  const sessionCookie = (await cookies()).get("session");
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
          const cookie = await cookies();
          const currentURL = cookie.get("X-Requested-URL")?.value || "/";
          redirect(`${BASE_URL}/refresh-token?next=${currentURL}`);
        }
      }
    }
  }
}

export default async function ProductDetailContainer({
  productId
}: {
  productId: string | undefined;
}) {
  const myProfileQueryKeyConfig = queryKeys.profile.my;
  const queryClient = new QueryClient();

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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailPage />
    </HydrationBoundary>
  );
}
