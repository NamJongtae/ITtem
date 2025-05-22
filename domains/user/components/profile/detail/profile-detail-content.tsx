import ProfileDetailProduct from "./product/prodfile-detail-product";
import ProfileDetailReview from "./review/profile-detail-review";
import ProfileDetailWish from "./wish/profile-detail-wish";
import ProfileDetailFollowings from "./follow/profile-detail-followings";
import ProfileDetailFollowers from "./follow/profile-detail-followers";
import { ProfileData, ProfileMenu } from "../../../types/profile-types";

interface IProps {
  profileMenu: ProfileMenu;
  profileData: ProfileData | undefined;
  isMyProfile?: boolean;
}

export default function ProfileDetailContent({
  profileMenu,
  profileData,
  isMyProfile
}: IProps) {
  switch (profileMenu) {
    case "판매상품": {
      return (
        <ProfileDetailProduct
          profileData={profileData}
          isMyProfile={isMyProfile}
        />
      );
    }
    case "거래후기": {
      return (
        <ProfileDetailReview
          reviewInfo={profileData?.reviewInfo}
          uid={profileData?.uid}
        />
      );
    }
    case "찜": {
      return <ProfileDetailWish wishProductIds={profileData?.wishProductIds} />;
    }
    case "팔로잉": {
      return <ProfileDetailFollowings profileData={profileData} />;
    }
    case "팔로워": {
      return <ProfileDetailFollowers profileData={profileData} />;
    }
    default: {
      return null;
    }
  }
}
