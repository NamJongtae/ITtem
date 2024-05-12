import ProfileDetailProduct from "./profileDetailProduct/profile-detail-product";
import ProfileDetailReview from "./profileDetailReview/profile-detail-review";
import { ProfileMenu } from "./profile-page";
import ProfileDetailWish from "./profileDetailWish/profile-detail-wish";
import ProfileDetailFollowing from "./profileDetailFollow/profile-detail-following";
import ProfileDetailFollower from "./profileDetailFollow/profile-detail-follower";
import { ProfileData } from "@/types/authTypes";

interface IProps {
  profileMenu: ProfileMenu;
  profileData: ProfileData | undefined;
  my?: boolean;
}

export default function ProfileDetailContent({
  profileMenu,
  profileData,
  my,
}: IProps) {
  switch (profileMenu) {
    case "판매상품": {
      return <ProfileDetailProduct profileData={profileData} my={my} />;
    }
    case "거래후기": {
      return <ProfileDetailReview />;
    }
    case "찜": {
      return <ProfileDetailWish />;
    }
    case "팔로잉": {
      return <ProfileDetailFollowing />;
    }
    case "팔로워": {
      return <ProfileDetailFollower />;
    }
    default: {
      return null;
    }
  }
}
