import ProductManageListSkeletonUI from "@/domains/product/manage/components/list/ListSkeletonUI";

export default function ProductManageLoading() {
  return (
    <div className="max-w-[1024px] w-full mx-auto mt-8 px-8 animate-pulse">
      {/* 검색 네비게이션 */}
      <div className="flex flex-row justify-between items-center gap-3 border-b-2 border-black pb-5">
        <div className="w-[330px] h-[42px] bg-gray-200 rounded" />
        <div className="flex gap-2">
          <div className="w-10 h-7 bg-gray-200 rounded" />
          <div className="w-10 h-7 bg-gray-200 rounded" />
        </div>
      </div>

      <div />

      {/* 삼품 관리 목록 */}
      <div className="flex gap-3 flex-warp mt-3">
        {[
          ...Array(4).map((_, i) => (
            <div key={i} className="w-[72px] h-[38px] rounded-md bg-gray-200" />
          ))
        ]}
      </div>

      <ProductManageListSkeletonUI />
    </div>
  );
}
