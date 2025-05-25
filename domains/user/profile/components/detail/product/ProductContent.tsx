"use client";

import CategoryMenu from "./CategoryMenu";
import useProfileProductCategory from "../../../hooks/useProfileProductCategory";
import { ProfileData } from "../../../types/profileTypes";
import ProductListSkeletonUI from "@/domains/product/shared/components/product-list/ProductListSkeletonUI";
import List from "./List";
import SuspenseErrorBoundary from "@/shared/common/components/SuspenseErrorBoundary";
import ProductListError from "@/domains/product/shared/components/product-list/ProductListError";

interface IProps {
  profileData: ProfileData | undefined;
  isMyProfile?: boolean;
}

export default function ProductContent({
  profileData,
  isMyProfile
}: IProps) {
  const { category, selectCategory } = useProfileProductCategory();

  return (
    <div>
      <div className="border-b w-full py-5 flex justify-between items-center">
        <h2 className="font-medium">{category}</h2>
        <CategoryMenu
          currentCategory={category}
          selectCategory={selectCategory}
        />
      </div>

      <SuspenseErrorBoundary
        suspenseFallback={<ProductListSkeletonUI listCount={8} />}
        errorFallback={<ProductListError productListType="PROFILE" />}
      >
        <List
          isMyProfile={isMyProfile}
          productIds={profileData?.productIds}
          productCategory={category}
        />
      </SuspenseErrorBoundary>
    </div>
  );
}
