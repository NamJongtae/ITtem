"use client";

import useProductQuery from "@/domains/product/shared/hooks/queries/useProductQuery";
import Image from "next/image";

const SkeletonBox = () => {
  return (
    <div className="flex gap-2 items-center w-12 h-5 bg-gray-200 animate-pulse" />
  );
};

export default function ContentInfoClientStatus() {
  const { productData, showCSRSkeleton } = useProductQuery();

  return (
    <>
      {/* 찜 수 */}
      {showCSRSkeleton ? (
        <SkeletonBox />
      ) : (
        <span className="flex gap-2 items-center">
          <Image
            style={{ width: 14, height: 28 }}
            src="/icons/heart-icon.svg"
            alt="찜 횟수"
            width={14}
            height={28}
          />
          {productData.wishCount}
        </span>
      )}

      {/* 조회 수 */}
      {showCSRSkeleton ? (
        <SkeletonBox />
      ) : (
        <span className="flex gap-2 items-center">
          <Image
            className="w-[20px] h-[14px]"
            src="/icons/eye-icon.svg"
            alt="조회수"
            width={20}
            height={14}
          />
          {productData.viewCount}
        </span>
      )}
    </>
  );
}
