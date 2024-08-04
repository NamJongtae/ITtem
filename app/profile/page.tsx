import ProfilePage from "@/components/profile/profile-page";
import { BASE_URL } from "@/constants/constant";
import customAxios from "@/lib/customAxios";
import { sessionOptions } from "@/lib/server";
import { queryKeys } from "@/query-keys/query-keys";
import { IronSessionData } from "@/types/api-types";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";

export async function generateMetadata() {
  const { getIronSession } = await import("iron-session");
  const session = await getIronSession<IronSessionData>(
    cookies(),
    sessionOptions
  );
  if (session.refreshToken) {
    const response = await customAxios("/api/profile", {
      headers: {
        Cookie: cookies() as any,
      },
    });
    const profile = response.data.profile;
    const title = `ITtem | "${profile.nickname}님"의 프로필`;
    const url = `${BASE_URL}/profile`;
    return {
      metadataBase: new URL(url),
      title,
      openGraph: {
        url,
        title,
      },
    };
  }
  return {
    title: "ITtem | 나의 프로필",
  };
}

async function prefetchMyProfile(queryClient: QueryClient) {
  const { getIronSession } = await import("iron-session");
  const session = await getIronSession<IronSessionData>(
    cookies(),
    sessionOptions
  );
  const myProfileQueryKeyConfig = queryKeys.profile.my;
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
          console.error(error);
        }
      },
    });
  }
}

export default async function MyProfile() {
  const queryClient = new QueryClient();
  await prefetchMyProfile(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfilePage my={true} />
    </HydrationBoundary>
  );
}
