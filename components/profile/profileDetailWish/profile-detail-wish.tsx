import ProfileDetailWishDelBtn from "./profile-detail-wish-delBtn";
import { useState } from "react";
import ProfileDetailWishList from "./profile-detail-wish-list";

interface IProps {
  wishProductIds: string[] | undefined;
}

export default function ProfileDetailWish({ wishProductIds }: IProps) {

  return (
    <div className="mt-8 mb-8">
      <h2 className="font-semibold border-b pb-3 mb-3">
        찜 {wishProductIds?.length || 0}개
      </h2>

      <ProfileDetailWishList
        wishProductIds={wishProductIds}
      />
    </div>
  );
}
