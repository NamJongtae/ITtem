import ProfileProductCategoryMenu from "./profile-product-category-menu";
import useProfileProductCategory from "@/hooks/profile/useProfileProductCategory";
import { ProfileData } from "@/types/auth-types";
import ProductListSkeletonUI from "@/components/commons/product-list/product-list-skeletonUI";
import ProfileDetailProductList from "./profile-detail-product-list";
import SuspenseErrorBoundary from "@/components/commons/suspense-error-boundary";
import ProductListError from "@/components/commons/product-list/product-list-error";

interface IProps {
  userProfileData: ProfileData | undefined;
  isMyProfile?: boolean;
}

export default function ProfileDetailProduct({
  userProfileData,
  isMyProfile
}: IProps) {
  const { category, selectCategory } = useProfileProductCategory();

  return (
    <div>
      <div className="border-b w-full py-5 flex justify-between items-center">
        <h2 className="font-medium">{category}</h2>
        <ProfileProductCategoryMenu
          currentCategory={category}
          selectCategory={selectCategory}
        />
      </div>

      <SuspenseErrorBoundary
        suspenseFallback={<ProductListSkeletonUI listCount={8} />}
        errorFallback={<ProductListError productListType="PROFILE" />}
      >
        <ProfileDetailProductList
          isMyProfile={isMyProfile}
          productIds={userProfileData?.productIds}
        />
      </SuspenseErrorBoundary>
    </div>
  );
}
