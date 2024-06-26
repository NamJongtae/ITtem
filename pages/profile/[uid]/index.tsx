import ProfilePage from "@/components/profile/profile-page";
import { REFRESH_TOKEN_KEY } from "@/constants/constant";
import { queryKeys } from "@/queryKeys";
import customAxios from "@/lib/customAxios";
import { sessionOptions } from "@/lib/server";
import { verifyToken } from "@/lib/token";
import { IronSessionData } from "@/types/apiTypes";

import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getIronSession } from "iron-session";
import { GetServerSideProps } from "next";
import DynamicMetaHead from "@/components/dynamicMetaHead/dynamic-meta-head";
import { getDynamicMetaData } from "@/lib/getDynamicMetaData";
import { ProfileData } from "@/types/authTypes";
import { MetaData } from "@/types/metaDataTypes";

interface IProps {
  metaData: MetaData;
}

export default function UserProfile({ metaData }: IProps) {
  return (
    <>
      <DynamicMetaHead {...metaData} />
      <ProfilePage my={false} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res, query, resolvedUrl } = context;
  const uid = query.uid;
  const queryClient = new QueryClient();
  const session = await getIronSession<IronSessionData>(
    req,
    res,
    sessionOptions
  );
  const cookie = req.headers.cookie;
  const myProfuileQueryKeyConfig = queryKeys.profile.my;
  const userProfileQueryKeyConfig = queryKeys.profile.user(uid as string);

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
      queryKey: myProfuileQueryKeyConfig.queryKey,
      queryFn: async () => {
        try {
          const response = await customAxios("/api/profile", {
            headers: {
              Cookie: cookie,
            },
          });
          return response.data.profile;
        } catch (error) {
          queryClient.removeQueries({
            queryKey: myProfuileQueryKeyConfig.queryKey,
          });
          console.error(error);
        }
      },
    });
  }

  await queryClient.prefetchQuery({
    queryKey: userProfileQueryKeyConfig.queryKey,
    queryFn: userProfileQueryKeyConfig.queryFn,
  });
  const userProfileData = queryClient.getQueryData(
    userProfileQueryKeyConfig.queryKey
  ) as ProfileData | undefined;

  const metaData = getDynamicMetaData({
    url: resolvedUrl,
    title: `${userProfileData?.nickname || ""}님의 프로필`,
  });

  return {
    props: { dehydratedState: dehydrate(queryClient), metaData },
  };
};
