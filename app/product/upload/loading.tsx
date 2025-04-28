export default function ProductUploadLoading() {
  return (
    <div className="mx-auto pt-8 pb-12 max-w-6xl px-5 xl:px-0 animate-pulse">
      {/* 제목 */}
      <div className="w-24 h-10 mb-3 bg-gray-200" />
      <div className="border-b-2 border-b-gray-600" />

      {/* 상품 이미지 */}
      <div className="border-b py-8">
        <div className="bg-gray-200 w-20 h-7" />
        <div className="bg-gray-200 rounded-lg w-[192px] h-[192px] mt-5" />
      </div>

      {/* 상품명 */}
      <div className="border-b py-8">
        <div className="bg-gray-200 w-20 h-7" />
        <div className="bg-gray-200 w-full max-w-[384px] h-[50px] mt-5" />
      </div>

      {/* 판매유형 */}
      <div className="border-b py-8">
        <div className="bg-gray-200 w-20 h-7" />
        <div className="flex gap-2 mt-5">
          <div className="bg-gray-200 w-20 h-5" />
          <div className="bg-gray-200 w-20 h-5" />
        </div>
      </div>

      {/* 카테고리 */}
      <div className="border-b py-8">
        <div className="bg-gray-200 w-20 h-7" />
        <div className="bg-gray-200 w-full h-[202px] max-w-[370px] mt-5 rounded-lg" />
      </div>

      {/* 거래지역 */}
      <div className="border-b py-8">
        <div className="bg-gray-200 w-20 h-7" />
        <div className="flex gap-3">
          <div className="bg-gray-200 w-20 h-12 mt-5" />
          <div className="bg-gray-200 w-20 h-12 mt-5" />
          <div className="bg-gray-200 w-20 h-12 mt-5" />
        </div>

        <div className="bg-gray-200 w-full h-12 mt-5" />
      </div>

      {/* 상품상태 */}
      <div className="border-b py-8">
        <div className="bg-gray-200 w-20 h-7" />
        <div className="flex flex-col gap-5 mt-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-200 w-64 h-6" />
          ))}
        </div>
      </div>

      {/* 반품여부 */}
      <div className="border-b py-8">
        <div className="bg-gray-200 w-20 h-7" />
        <div className="flex gap-2 mt-5">
          <div className="bg-gray-200 w-20 h-5" />
          <div className="bg-gray-200 w-20 h-5" />
        </div>
      </div>

      {/* 거래방식 */}
      <div className="border-b py-8">
        <div className="bg-gray-200 w-20 h-7" />
        <div className="flex gap-2 mt-5">
          <div className="bg-gray-200 w-20 h-5" />
          <div className="bg-gray-200 w-20 h-5" />
          <div className="bg-gray-200 w-20 h-5" />
        </div>
      </div>

      {/* 가격 */}
      <div className="border-b py-8">
        <div className="bg-gray-200 w-20 h-7" />
        <div className="bg-gray-200 w-full max-w-[320px] h-[50px] mt-5" />
      </div>

      {/* 배송비 */}
      <div className="border-b py-8">
        <div className="bg-gray-200 w-20 h-7" />
        <div className="flex gap-2 mt-5">
          <div className="bg-gray-200 w-20 h-5" />
          <div className="bg-gray-200 w-20 h-5" />
        </div>
      </div>

      {/* 상품 설명 */}
      <div className="border-b py-8">
        <div className="bg-gray-200 w-20 h-7" />
        <div className="bg-gray-200 w-full h-56 mt-5 rounded-sm" />
      </div>
    </div>
  );
}
