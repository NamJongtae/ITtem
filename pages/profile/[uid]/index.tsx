import ProfilePage from "@/components/profile/profile-page";
import {
  MY_PROFILE_QUERY_KEY,
  REFRESH_TOKEN_KEY,
  getProfileQueryKey,
} from "@/constants/constant";
import { getUserProfile } from "@/lib/api/auth";
import customAxios from "@/lib/customAxios";
import { sessionOptions } from "@/lib/server";
import { verifyToken } from "@/lib/token";
import { IronSessionData } from "@/types/apiTypes";

import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getIronSession } from "iron-session";
import { GetServerSideProps } from "next";

export default function UserProfile() {
  return <ProfilePage my={false} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.query.uid;
  const queryClient = new QueryClient();
  const session = await getIronSession<IronSessionData>(
    context.req,
    context.res,
    sessionOptions
  );
  const cookie = context.req.headers.cookie;

  if (session.refreshToken) {
    const refreshToken = session.refreshToken;
    const decodeToken = verifyToken(refreshToken, REFRESH_TOKEN_KEY);
    const myUid = decodeToken?.data?.user.uid;

    if (myUid) {
      if (uid === myUid) {
        return {
          redirect: {
            destination: "/profile",
            permanent: false,
          },
        };
      }
    }
    
    await queryClient.prefetchQuery({
      queryKey: MY_PROFILE_QUERY_KEY,
      queryFn: async () => {
        try {
          const response = await customAxios("/api/profile", {
            headers: {
              Cookie: cookie,
            },
          });
          return response.data.profile;
        } catch (error) {
          queryClient.removeQueries({ queryKey: MY_PROFILE_QUERY_KEY });
          console.error(error);
        }
      },
    });
  }

  await queryClient.prefetchQuery({
    queryKey: getProfileQueryKey(uid as string),
    queryFn: async () => {
      const response = await getUserProfile(uid as string);
      return response.data.profile;
    },
  });

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};
