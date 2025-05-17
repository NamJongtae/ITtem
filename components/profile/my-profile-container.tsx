import { BASE_URL } from "@/constants/constant";
import customAxios from "@/lib/customAxios";
import { sessionOptions } from "@/lib/server";
import { queryKeys } from "@/query-keys/query-keys";
import { IronSessionData } from "@/types/api-types";
import { ProfileData } from "@/types/auth-types";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import MyProfilePage from "./my-profile-page";
import SuspenseErrorBoundary from "../commons/suspense-error-boundary";
import ProfileDetailSkeletonUI from "./detail/profile-detail-skeletonUI";
import ProductListError from "../commons/product-list/product-list-error";

async function prefetchProfile() {
  const { getIronSession } = await import("iron-session");
  const session = await getIronSession<IronSessionData>(
    await cookies(),
    sessionOptions
  );
  const allCookies = (await headers()).get("cookie");

  if (session.refreshToken) {
    try {
      const response = await customAxios("/api/profile", {
        headers: {
          Cookie: allCookies
        }
      });
      return response.data.profile as ProfileData;
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

export default async function MyProfileContainer() {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: queryKeys.profile.my.queryKey,
    queryFn: prefetchProfile
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SuspenseErrorBoundary
        suspenseFallback={<ProfileDetailSkeletonUI />}
        errorFallback={<ProductListError productListType="PROFILE" />}
      >
        <MyProfilePage />
      </SuspenseErrorBoundary>
    </HydrationBoundary>
  );
}
