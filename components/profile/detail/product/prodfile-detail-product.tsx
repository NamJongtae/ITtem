import ProductList from "@/components/commons/product-list/product-list";
import ProfileDetailProductCategoryMenu from "./prodfile-detail-product-category-menu";
import useProfileProductCategory from "@/hooks/profile/useProfileProductCategory";
import { ProfileData } from "@/types/auth-types";
import { Suspense } from "react";
import ProductListSkeletonUI from "@/components/commons/product-list/product-list-skeletonUI";

interface IProps {
  userProfileData: ProfileData | undefined;
  my?: boolean;
}

export default function ProfileDetailProduct({ userProfileData, my }: IProps) {
  const { category, selectCategory } = useProfileProductCategory();

  return (
    <div>
      <div className="border-b w-full py-5 flex justify-between items-center">
        <h2 className="font-medium">{category}</h2>
        <ProfileDetailProductCategoryMenu
          currentCategory={category}
          selectCategory={selectCategory}
        />
      </div>

      <Suspense
        fallback={
          <ul>
            <ProductListSkeletonUI />
          </ul>
        }
      >
        <ProductList
          productListType={my ? "MY_PROFILE" : "PROFILE"}
          productIds={userProfileData?.productIds}
          profileProductCategory={category}
        />
      </Suspense>
    </div>
  );
}
