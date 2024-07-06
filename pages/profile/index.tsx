import { queryKeys } from "@/queryKeys";
import customAxios from "@/lib/customAxios";
import { sessionOptions } from "@/lib/server";
import { IronSessionData } from "@/types/apiTypes";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import DynamicMetaHead from "@/components/dynamicMetaHead/dynamic-meta-head";
import { getDynamicMetaDataURL } from "@/lib/getDynamicMetaData";
import dynamic from "next/dynamic";
import { withAuthServerSideProps } from "@/lib/withAuthServerSideProps";
const ProfilePage = dynamic(() => import("@/components/profile/profile-page"));

export default function MyProfile() {
  return (
    <>
      <DynamicMetaHead
        title="나의 프로필"
        url={getDynamicMetaDataURL("profile")}
      />
      <ProfilePage my={true} />
    </>
  );
}

export const getServerSideProps = withAuthServerSideProps(async (context) => {
  const queryClient = new QueryClient();
  const { getIronSession } = await import("iron-session");
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
          console.error(error);
        }
      },
    });
  }
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
});
