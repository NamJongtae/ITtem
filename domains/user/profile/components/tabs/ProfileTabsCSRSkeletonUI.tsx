"use client";

import ProductListSkeletonUI from "@/domains/product/shared/components/product-list/ProductListSkeletonUI";
import ReviewSkeletonUI from "./review/ReviewSkeletonUI";
import WishListSkeletonUI from "./wish/WishListSkeletonUI";
import FollowSkeletonUI from "./follow/SkeletonUI";
import { useSearchParams } from "next/navigation";
import { ProfileMenu } from "../../types/profileTypes";

interface IProps {
  isMyProfile?: boolean;
}

const MY_PROFILE_MENUS: ProfileMenu[] = [
  "products",
  "reviews",
  "wishlist",
  "followers",
  "followings"
];

export default function ProfileTabsCSRSkeletonUI({ isMyProfile }: IProps) {
  const searchParams = useSearchParams();
  const m = (searchParams.get("m") ?? "products") as ProfileMenu;
  const normalizeProfileMenu = MY_PROFILE_MENUS.includes(m) ? m : "products";

  return (
    <div className="mt-5 max-w-[1024px] mx-auto px-4 md:px-8 animate-pulse">
      {/* 메뉴 */}
      <div className="flex justify-between w-full h-full font-medium text-sm md:text-base">
        {[...Array(isMyProfile ? 5 : 4)].map((_, i) => (
          <div
            key={i}
            className={`w-full h-12 border-b border-b-black pl-[1px]`}
          >
            <div className="w-full h-full bg-gray-300 animate-pulse" />
          </div>
        ))}
      </div>

      {/* 카운터 & 필터  */}
      {normalizeProfileMenu === "products" ? (
        <div className="flex justify-between items-center">
          <div className="w-20 h-6 bg-gray-300 mt-5 mb-5 rounded" />
          <div className="w-[105px] h-[36px] bg-gray-300 mt-5 mb-5 rounded" />
        </div>
      ) : (
        <div className="w-20 h-6 bg-gray-300 mt-5 mb-5 rounded" />
      )}
      <div className="w-full h-1 border-b mb-4" />

      {normalizeProfileMenu === "products" && <ProductListSkeletonUI />}
      {normalizeProfileMenu === "reviews" && <ReviewSkeletonUI />}
      {normalizeProfileMenu === "wishlist" && isMyProfile && (
        <WishListSkeletonUI />
      )}
      {(normalizeProfileMenu === "followers" ||
        normalizeProfileMenu === "followings") && <FollowSkeletonUI />}
    </div>
  );
}
