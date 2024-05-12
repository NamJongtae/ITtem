import ProfilePage from "@/components/profile/profile-page";
import { REFRESH_TOKEN_KEY, getProfileQueryKey } from "@/constants/constant";
import { getUserProfile } from "@/lib/api/auth";
import { sessionOptions } from "@/lib/server";
import { verifyToken } from "@/lib/token";
import { IronSessionData } from "@/types/apiTypes";

import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getIronSession } from "iron-session";
import { GetServerSideProps } from "next";

export default function UserProfile() {
  return <ProfilePage />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.query.uid;
  const session = await getIronSession<IronSessionData>(
    context.req,
    context.res,
    sessionOptions
  );

  if (session) {
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
  }

  const queryClient = new QueryClient();

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
