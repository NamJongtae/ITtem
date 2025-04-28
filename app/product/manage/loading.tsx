import ProductManageListSkeletonUI from "@/components/product-manage/list/product-manage-list-skeletonUI";

export default function ProductManageLoading() {
  return (
    <div className="max-w-[1024px] w-full mx-auto mt-8 px-8 animate-pulse">
      {/* 검색 네비게이션 */}
      <div className="flex justify-between w-full">
        <div className="w-[330px] h-10 bg-gray-200" />
        <div className="flex gap-3 mb-5">
          <div className="w-7 h-7 bg-gray-200" />
          <div className="w-7 h-7 bg-gray-200" />
        </div>
      </div>

      <div className="border-b-2 border-gray-600 w-full" />
      <div />

      {/* 삼품 관리 목록 */}
      <div className="flex gap-3 flex-warp mt-3">
        <div className="w-[72px] h-[38px] rounded-md bg-gray-200" />
        <div className="w-[115px] h-[38px] rounded-md bg-gray-200" />
        <div className="w-[120px] h-[38px] rounded-md bg-gray-200" />
        <div className="w-[150px] h-[38px] rounded-md bg-gray-200" />
      </div>
      <ProductManageListSkeletonUI />
    </div>
  );
}
