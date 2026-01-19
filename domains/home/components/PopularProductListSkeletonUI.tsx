export default function PopularProductListSkeletonUI() {
  return (
    <div className="flex w-full h-[338px] gap-[10px] slider_md:gap-[20px] slider_l:gap-[30px] animate-pulse overflow-hidden">
      {/* 1번: 항상 보임 */}
      <div className="flex flex-1">
        <SkeletonCard />
      </div>

      {/* 2번: 540px 이상 */}
      <div className="hidden slider_md:flex flex-1">
        <SkeletonCard />
      </div>

      {/* 3번: 764px 이상 */}
      <div className="hidden slider_l:flex flex-1">
        <SkeletonCard />
      </div>

      {/* 4번: 1024px 이상 */}
      <div className="hidden slider_xl:flex flex-1">
        <SkeletonCard />
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="w-full h-full rounded shadow-lg border min-w-0">
      <div className="flex w-full h-full flex-col overflow-hidden">
        <div className="w-full h-full bg-gray-300 rounded" />
        <div className="px-[10px] py-[15px]">
          <div className="h-[14px] bg-gray-300 mb-2 rounded" />
          <div className="h-[14px] bg-gray-300 w-2/3 mb-2 rounded" />
          <div className="flex justify-between">
            <div className="w-20 h-3 bg-gray-300 rounded" />
            <div className="w-12 h-3 bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
