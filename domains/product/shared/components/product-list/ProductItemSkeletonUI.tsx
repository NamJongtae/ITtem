export default function ProductItemSkeletonUI() {
  return (
    <div className="w-full h-full mx-auto rounded shadow-lg animate-pulse border max-w-xs">
      <div className="mx-auto group flex w-full h-full flex-col overflow-hidden">
        <div className="relative w-full overflow-hidden bg-gray-300 h-[280px] sm:h-[240px] md:h-[220px] lg:h-[200px]">
          <div className="w-full h-full bg-gray-300" />
        </div>
        <div className="h-[84px] px-[10px] py-[15px]">
          <div className="h-[14px] bg-gray-300 w-2/3 mb-2 rounded"></div>
          <div className="h-[14px] bg-gray-300 w-1/3 mb-2 rounded"></div>
          <div className="flex justify-between rounded">
            <div className="w-20 h-3 bg-gray-300 rounded"></div>
            <div className="w-20 h-3 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
