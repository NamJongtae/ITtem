import ProfilePage from "@/components/profile/profile-page";
import { getProfileQueryKey } from "@/constants/constant";
import { getUserProfile } from "@/lib/api/auth";

import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";

export default function UserProfile() {
  return <ProfilePage />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const uid = context.query.uid;

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
