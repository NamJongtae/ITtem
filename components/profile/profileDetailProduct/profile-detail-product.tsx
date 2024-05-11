import ProfileDetailProductCategory from "./profile-detail-product-category";
import useProfileProductCategory from "@/hooks/profile/useProfileProductCategory";

export default function ProfileDetailProduct() {
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

    </div>
  );
}
