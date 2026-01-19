export default function ProductDetailLoading() {
  return (
    <div className="pt-8 pb-12">
      <div className="relative container mx-auto px-6 max-w-[1024px]">
        <div className={"w-36 h-5 max-w-7xl mb-5 bg-gray-200"} />

        {/* 상단 */}
        <div className="md:flex block animate-pulse">
          {/* 상품 이미지*/}
          <div className="w-full h-80 md:h-80 md:w-1/2 lg:h-96 bg-gray-200">
            <div className="relative w-full h-full h-70 max-w-[512px] max-h-[384px] mx-auto rounded overflow-hidden" />
          </div>

          {/* 상품 정보 */}
          <div className="w-full mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
            <div className="w-full h-10 font-size-[1.875rem] line-height-[2.25rem] md: font-size-[2.25rem] md:line-height-[2.5rem] bg-gray-200 rounded" />

            <div className="w-40 h-10 mt-3 font-size-[1.875rem] line-height-[2.25rem] md: font-size-[2.25rem] md:line-height-[2.5rem] bg-gray-200 rounded" />

            <hr className="my-3" />

            <div className="flex justify-between">
              <div className="flex gap-3">
                <div className="flex gap-2 w-12 h-5 bg-gray-200 rounded" />

                <div className="flex gap-2 items-center w-12 h-5 bg-gray-200 rounded" />

                <div className="flex gap-2 items-center w-20 h-5 bg-gray-200 rounded" />
              </div>
              <div className="flex gap-2 items-center w-20 h-5 bg-gray-200 rounded" />
            </div>

            <div className="mt-5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="mb-3 flex gap-3">
                  <div className="w-full h-5 bg-gray-200 rounded" />
                </div>
              ))}
            </div>

            <div className="w-full flex items-center mt-6 gap-3">
              <div className="mb-3 flex gap-3 flex-wrap">
                <>
                  <div className={`w-[91px] h-9 bg-gray-200 rounded`} />
                  <div className={`w-[108px] h-9 bg-gray-200 rounded`} />
                  <div className={`w-[124px] h-9 bg-gray-200 rounded`} />
                </>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 */}
        <div className="container mt-16 flex flex-col xl:flex-row border-t-2 border-solid border-black justify-between gap-10 xl:gap-5 pt-10 mx-auto max-w-7x">
          {/* 상품 설명 */}
          <div className="basis-2/3">
            <div className="text-gray-600 text-xl font-medium">상품정보</div>
            <hr className="h-px border-0 bg-gray-200 my-3" />
            <div className="w-full space-y-3 animate-pulse">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded" />
              ))}
            </div>
          </div>

          {/* 판매자 정보 */}
          <div className="basis-1/3">
            <div className="text-gray-600 text-xl font-medium">판매자 정보</div>
            <hr className="h-px border-0 bg-gray-200 my-3" />

            {/* 프로필 정보 */}
            <div className="flex items-center gap-3 animate-pulse">
              <div className="inline-flex items-center gap-4 p-3">
                {/* 프로필 이미지 */}
                <div className="inline-block h-14 w-14 rounded-full mr-1 bg-gray-200" />
                {/* 닉네임, 평가 정보 */}
                <div className="flex flex-col gap-1">
                  <div className="w-20 h-5 bg-gray-200 rounded" />
                  <div className="w-16 h-4 bg-gray-200 rounded" />
                </div>

                {/* 팔로우 버튼 */}
                {<div className="w-24 h-[40px] bg-gray-200 rounded" />}
              </div>
            </div>

            {/* 판매자 다른 상품 목록 */}
            <div className="mt-2">
              <div>판매자의 다른 상품</div>
              <hr className="h-px border-0 bg-gray-200 my-3" />
              <div className="grid grid-cols-autoFill_140 lg:grid-cols-autoFill_180 xl:grid-cols-3 gap-3 animate-pulse">
                <div className="mx-auto w-full h-full aspect-square bg-gray-200 rounded" />
                <div className="mx-auto w-full h-full aspect-square bg-gray-200 rounded" />
                <div className="mx-auto w-full h-full aspect-square bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
