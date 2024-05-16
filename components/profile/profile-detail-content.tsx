import ProfileDetailProduct from "./profileDetailProduct/profile-detail-product";
import ProfileDetailReview from "./profileDetailReview/profile-detail-review";
import { ProfileMenu } from "./profile-page";
import ProfileDetailWish from "./profileDetailWish/profile-detail-wish";
import ProfileDetailFollowing from "./profileDetailFollow/profile-detail-following";
import ProfileDetailFollower from "./profileDetailFollow/profile-detail-follower";
import { ProfileData } from "@/types/authTypes";

interface IProps {
  profileMenu: ProfileMenu;
  userProfileData: ProfileData | undefined;
  myProfileData: ProfileData | undefined;
  my?: boolean;
}

export default function ProfileDetailContent({
  profileMenu,
  userProfileData,
  myProfileData,
  my,
}: IProps) {
  switch (profileMenu) {
    case "판매상품": {
      return <ProfileDetailProduct userProfileData={userProfileData} my={my} />;
    }
    case "거래후기": {
      return <ProfileDetailReview reviewInfo={userProfileData?.reviewInfo} />;
    }
    case "찜": {
      return (
        <ProfileDetailWish wishProductIds={myProfileData?.wishProductIds} />
      );
    }
    case "팔로잉": {
      return (
        <ProfileDetailFollowing
          userProfileData={userProfileData}
          myProfileData={myProfileData}
        />
      );
    }
    case "팔로워": {
      return (
        <ProfileDetailFollower
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
