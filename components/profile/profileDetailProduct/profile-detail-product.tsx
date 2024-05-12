import ProductList from "@/components/commons/productList/product-list";
import ProfileDetailProductCategory from "./profile-detail-product-category";
import useProfileProductCategory from "@/hooks/profile/useProfileProductCategory";
import { ProfileData } from "@/types/authTypes";

interface IProps {
  profileData: ProfileData | undefined;
  my?: boolean;
}

export default function ProfileDetailProduct({ profileData, my }: IProps) {
  const { category, selectCategory } = useProfileProductCategory();

  return (
    <div>
      <div className="border-b w-full py-5 flex justify-between items-center">
        <h2 className="font-medium">{category}</h2>
        <ProfileDetailProductCategory
          currentCategory={category}
          selectCategory={selectCategory}
        />
      </div>

      <ProductList
        productListType={my ? "MY_PROFILE" : "PROFILE"}
        productIds={profileData?.productIds}
        profileProductCategory={category}
      />
    </div>
  );
}
