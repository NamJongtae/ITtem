import ProfileDetailProduct from "./profileDetailProduct/profile-detail-product";
import ProfileDetailReview from "./profileDetailReview/profile-detail-review";
import { ProfileMenu } from "./profile-page";
import ProfileDetailWish from "./profileDetailWish/profile-detail-wish";
import ProfileDetailFollowing from "./profileDetailFollow/profile-detail-following";
import ProfileDetailFollower from "./profileDetailFollow/profile-detail-follower";

interface IProps {
  profileMenu: ProfileMenu;
}

export default function ProfileDetailContent({ profileMenu }: IProps) {
  switch (profileMenu) {
    case "판매상품": {
      return <ProfileDetailProduct />;
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
