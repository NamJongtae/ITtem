import { BASE_URL } from "@/constants/constant";
import customAxios from "@/utils/customAxios";
import { SESSION_OPTIONS } from "@/domains/auth/constants/constansts";
import { queryKeys } from "@/query-keys/query-keys";
import { IronSessionData } from "@/domains/auth/types/auth-types";
import { ProfileData } from "../../types/profile-types";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import MyProfilePage from "./my-profile-page";
import SuspenseErrorBoundary from "../../../../components/suspense-error-boundary";
import ProfileDetailSkeletonUI from "./detail/profile-detail-skeletonUI";
import Empty from "../../../../components/empty";

async function prefetchProfile() {
  const { getIronSession } = await import("iron-session");
  const session = await getIronSession<IronSessionData>(
    await cookies(),
    SESSION_OPTIONS
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
        errorFallback={
          <Empty
            message={
              "나의 프로필을 불러올 수 없어요.\n 잠시 후 다시 시도해주세요."
            }
          />
        }
      >
        <MyProfilePage />
      </SuspenseErrorBoundary>
    </HydrationBoundary>
  );
}
