import { BASE_URL } from "@/shared/common/constants/constant";
import incrementProductView from "../api/incrementProductView";
import customAxios from "@/shared/common/utils/customAxios";
import { SESSION_OPTIONS } from "@/domains/auth/shared/common/constants/constansts";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { IronSessionData } from "@/domains/auth/shared/common/types/authTypes";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import { getIronSession } from "iron-session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ProductDetailPage from "./ProductDetailPage";

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
    SESSION_OPTIONS
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
  } else {
    return null;
  }
}

export default async function PageContainer({
  productId
}: {
  productId: string | undefined;
}) {
  const myProfileQueryKeyConfig = queryKeys.profile.my;
  const queryClient = new QueryClient();

  if (productId) {
    await incrementProductView(productId);
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
