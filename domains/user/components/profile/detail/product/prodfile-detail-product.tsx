"use client";

import ProfileProductCategoryMenu from "./profile-product-category-menu";
import useProfileProductCategory from "@/domains/user/hooks/profile/useProfileProductCategory";
import { ProfileData } from "@/domains/user/types/profile-types";
import ProductListSkeletonUI from "@/domains/product/components/product-list/product-list-skeletonUI";
import ProfileDetailProductList from "./profile-detail-product-list";
import SuspenseErrorBoundary from "@/components/suspense-error-boundary";
import ProductListError from "@/domains/product/components/product-list/product-list-error";

interface IProps {
  profileData: ProfileData | undefined;
  isMyProfile?: boolean;
}

export default function ProfileDetailProduct({
  profileData,
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
          productIds={profileData?.productIds}
        />
      </SuspenseErrorBoundary>
    </div>
  );
}
