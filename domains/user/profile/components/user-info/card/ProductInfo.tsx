import { ProfileData, ProfileMenu } from "../../../types/profileTypes";

interface IProps {
  handleClickMenu: (menu: ProfileMenu) => void;
  profileData: ProfileData | undefined;
}

export default function ProductInfo({ profileData, handleClickMenu }: IProps) {
  return (
    <>
      <div className="text-sm font-medium">
        <button
          onClick={() => handleClickMenu("products")}
          className="relative mr-4 before:w-[1px] before:h-3 before:absolute before:bg-gray-400 before:-right-[9px] before:top-1/2 before:-translate-y-1/2"
        >
          상품 {profileData?.productIds.length || 0}
        </button>

        <button onClick={() => handleClickMenu("reviews")}>
          평가{" "}
          {profileData?.reviewInfo?.reviewPercentage
            ? `${profileData?.reviewInfo?.reviewPercentage}%`
            : "없음"}
        </button>
      </div>
      <span className="text-sm">상품판매 {profileData?.saleCount || 0}회</span>
    </>
  );
}
