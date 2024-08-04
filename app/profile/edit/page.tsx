import ProfileEditForm from "@/components/profile-edit/profile-edit-form";
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

export default async function ProfileEdit() {
  const queryClient = new QueryClient();
  await prefetchMyProfile(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileEditForm />
    </HydrationBoundary>
  );
}
