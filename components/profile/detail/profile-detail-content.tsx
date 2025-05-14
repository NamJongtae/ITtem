import ProfileDetailProduct from "./product/prodfile-detail-product";
import ProfileDetailReview from "./review/profile-detail-review";
import { ProfileMenu } from "../profile-page";
import ProfileDetailWish from "./wish/profile-detail-wish";
import ProfileDetailFollowings from "./follow/profile-detail-followings";
import ProfileDetailFollowers from "./follow/profile-detail-followers";
import { ProfileData } from "@/types/auth-types";

interface IProps {
  profileMenu: ProfileMenu;
  userProfileData: ProfileData | undefined;
  myProfileData: ProfileData | undefined;
  isMyProfile?: boolean;
}

export default function ProfileDetailContent({
  profileMenu,
  userProfileData,
  myProfileData,
  isMyProfile,
}: IProps) {
  switch (profileMenu) {
    case "판매상품": {
      return <ProfileDetailProduct userProfileData={userProfileData} isMyProfile={isMyProfile} />;
    }
    case "거래후기": {
      return (
        <ProfileDetailReview
          reviewInfo={userProfileData?.reviewInfo}
          uid={userProfileData?.uid}
        />
      );
    }
    case "찜": {
      return (
        <ProfileDetailWish wishProductIds={myProfileData?.wishProductIds} />
      );
    }
    case "팔로잉": {
      return (
        <ProfileDetailFollowings
          userProfileData={userProfileData}
          myProfileData={myProfileData}
        />
      );
    }
    case "팔로워": {
      return (
        <ProfileDetailFollowers
          userProfileData={userProfileData}
          myProfileData={myProfileData}
        />
      );
    }
    default: {
      return null;
    }
  }
}
