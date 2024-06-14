import ProfilePage from "@/components/profile/profile-page";
import { queryKeys } from '@/queryKeys';
import customAxios from "@/lib/customAxios";
import { sessionOptions } from "@/lib/server";
import { IronSessionData } from "@/types/apiTypes";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getIronSession } from "iron-session";
import { GetServerSideProps } from "next";

export default function MyProfile() {
  return <ProfilePage my={true} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  const session = await getIronSession<IronSessionData>(
    context.req,
    context.res,
    sessionOptions
  );
  const cookie = context.req.headers.cookie;
  const myProfuileQueryKeyConfig = queryKeys.profile.my;

  if (session.refreshToken) {
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
          queryClient.removeQueries({ queryKey: myProfuileQueryKeyConfig.queryKey });
          console.error(error);
        }
      },
    });
  }
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};
