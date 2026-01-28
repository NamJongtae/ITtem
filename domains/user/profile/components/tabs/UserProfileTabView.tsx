"use client";

import ProfileTabsView from "./ProfileTabsView";
import useProfileQuery from "../../hooks/queries/useProfileQuery";
import ProfileTabsSSRSkeletonUI from "./ProfileTabsSSRSkeletonUI";

export default function UserProfileTabView() {
  const { profileData, showCSRSkeleton } = useProfileQuery();

  if (showCSRSkeleton) {
    return <ProfileTabsSSRSkeletonUI isMyProfile={false} />;
  }

  return <ProfileTabsView profileData={profileData} isMyProfile={false} />;
}
