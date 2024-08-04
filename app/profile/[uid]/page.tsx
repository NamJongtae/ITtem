import ProfilePage from "@/components/profile/profile-page";
import { BASE_URL } from "@/constants/constant";
import customAxios from "@/lib/customAxios";
import { sessionOptions } from "@/lib/server";
import { IronSessionData } from "@/types/api-types";
import { cookies } from "next/headers";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { uid: string };
}) {
  const { getIronSession } = await import("iron-session");
  const session = await getIronSession<IronSessionData>(
    cookies(),
    sessionOptions
  );
  if (session.refreshToken) {
    const response = await customAxios(`/api/profile/${params.uid}`, {
      headers: {
        Cookie: cookies() as any,
      },
    });
    const profile = response.data.profile;
    const title = `ITtem | "${profile.nickname}"님의 프로필`;
    const url = `${BASE_URL}/profile/${params.uid}`;

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
    title: "ITtem | 프로필",
  };
}

export default function UserProfile() {
  return (
    <>
      <ProfilePage my={false} />
    </>
  );
}
