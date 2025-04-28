import ProductListSkeletonUI from "@/components/commons/product-list/product-list-skeletonUI";
import React from "react";

export default function ProductLoading() {
  return (
    <div className="max-w-[1024px] mx-auto w-full h-full mt-8 px-8 animate-pulse">
      {/* 네비게이션 */}
      <div className="flex gap-5 justify-between w-full items-center mb-5">
        <div className="bg-gray-200 w-40 h-5" />
        <div className="bg-gray-200 w-28 h-5" />
      </div>

      {/* 카테고리 메뉴 PC */}
      <div className="hidden sm:grid sm:grid-cols-5 my-6 gap-1">
        {[...Array(14)].map((_, i) => (
          <div key={i} className="bg-gray-200 p-5" />
        ))}
      </div>

      {/* 카테고리 메뉴 모바일 */}
      <div className="sm:hidden rounded-md w-[105px] h-9 bg-gray-200 ml-auto mr-[12px]" />

      {/* 상품 목록 */}
      <ul className="w-full grid gap-5 grid-cols-autoFill mt-6">
        <ProductListSkeletonUI listCount={12} />
      </ul>
    </div>
  );
}
