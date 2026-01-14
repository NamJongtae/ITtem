import ProductContent from "./product/ProductContent";
import ReviewContent from "./review/ReviewContent";
import WishlistContent from "./wish/WishlistContent";
import FollowingsContent from "./follow/FollowingsContent";
import FollowersContent from "./follow/FollowersContent";
import { ProfileData, ProfileMenu } from "../../types/profileTypes";

interface IProps {
  currentMenu: ProfileMenu;
  profileData: ProfileData | undefined;
  isMyProfile?: boolean;
}

export default function Content({
  currentMenu,
  profileData,
  isMyProfile
}: IProps) {
  switch (currentMenu) {
    case "products": {
      return (
        <ProductContent profileData={profileData} isMyProfile={isMyProfile} />
      );
    }
    case "reviews": {
      return (
        <ReviewContent
          reviewInfo={profileData?.reviewInfo}
          uid={profileData?.uid}
        />
      );
    }
    case "wishlist": {
      return <WishlistContent wishCount={profileData?.wishCount} />;
    }
    case "followers": {
      return <FollowersContent profileData={profileData} />;
    }
    case "followings": {
      return <FollowingsContent profileData={profileData} />;
    }

    default: {
      return (
        <ProductContent profileData={profileData} isMyProfile={isMyProfile} />
      );
    }
  }
}
