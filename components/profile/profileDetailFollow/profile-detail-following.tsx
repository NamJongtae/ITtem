import React from "react";
import ProfileDetailFollowList from "./profile-detail-follow-list";

export default function ProfileDetailFollowing() {
  return (
    <div className="mt-8 pb-8">
      <h2 className="font-semibold border-b pb-3 mb-5">팔로잉 5명</h2>
      <ProfileDetailFollowList />
    </div>
  );
}
