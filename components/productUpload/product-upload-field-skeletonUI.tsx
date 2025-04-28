export default function ProductUploadFieldSkeletonUI() {
  return (
    <>
      {/* 상품 이미지 */}
      <div className="border-b py-8">
        <div className="flex gap-3">
          <div className="text-lg font-semibold">
            상품이미지 {"(0/5)"} <span className="text-red-500">*</span>
          </div>

          <div className="w-[120px] h-[34px] bg-gray-200 animate-pulse" />
        </div>
        <div className="bg-gray-200 rounded-lg w-[192px] h-[192px] mt-5 animate-pulse" />
      </div>
      {/* 상품명 */}
      <div className="border-b py-8">
        <div className="text-lg font-semibold">
          상품명 <span className="text-red-500">*</span>
        </div>
        <div className="bg-gray-200 w-full max-w-[384px] h-[50px] mt-5 animate-pulse" />
      </div>
      {/* 판매유형 */}
      <div className="border-b py-8">
        <div className="text-lg font-semibold">
          판매유형 <span className="text-red-500">*</span>
        </div>
        <div className="flex gap-2 mt-5">
          <div className="bg-gray-200 w-20 h-5 animate-pulse" />
          <div className="bg-gray-200 w-20 h-5 animate-pulse" />
        </div>
      </div>
      {/* 카테고리 */}
      <div className="border-b py-8">
        <div className="text-lg font-semibold">
          카테고리 <span className="text-red-500">*</span>
        </div>
        <div className="bg-gray-200 w-full h-[202px] max-w-[370px] mt-5 rounded-lg animate-pulse" />
      </div>
      {/* 거래지역 */}
      <div className="border-b py-8">
        <div className="text-lg font-semibold">
          거래지역 <span className="text-red-500">*</span>
        </div>
        <div className="flex gap-3 animate-pulse">
          <div className="bg-gray-200 w-20 h-12 mt-5" />
          <div className="bg-gray-200 w-20 h-12 mt-5" />
          <div className="bg-gray-200 w-20 h-12 mt-5" />
        </div>

        <div className="bg-gray-200 w-full h-12 mt-5 animate-pulse" />
      </div>
      {/* 상품상태 */}
      <div className="border-b py-8">
        <div className="text-lg font-semibold">
          상품 상태 <span className="text-red-500">*</span>
        </div>
        <div className="flex flex-col gap-5 mt-5 animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-200 w-64 h-6" />
          ))}
        </div>
      </div>
      {/* 반품여부 */}
      <div className="border-b py-8">
        <div className="text-lg font-semibold">
          반품여부 <span className="text-red-500">*</span>
        </div>
        <div className="flex gap-2 mt-5 animate-pulse">
          <div className="bg-gray-200 w-20 h-5" />
          <div className="bg-gray-200 w-20 h-5" />
        </div>
      </div>
      {/* 거래방식 */}
      <div className="border-b py-8">
        <div className="text-lg font-semibold">
          거래방식 <span className="text-red-500">*</span>
        </div>
        <div className="flex gap-2 mt-5 animate-pulse">
          <div className="bg-gray-200 w-20 h-5" />
          <div className="bg-gray-200 w-20 h-5" />
          <div className="bg-gray-200 w-20 h-5" />
        </div>
      </div>
      {/* 가격 */}
      <div className="border-b py-8">
        <div className="text-lg font-semibold">
          가격 <span className="text-red-500">*</span>
        </div>
        <div className="bg-gray-200 w-full max-w-[320px] h-[50px] mt-5 animate-pulse" />
      </div>
      {/* 배송비 */}
      <div className="border-b py-8">
        <div className="text-lg font-semibold">
          배송비 <span className="text-red-500">*</span>
        </div>
        <div className="flex gap-2 mt-5 animate-pulse">
          <div className="bg-gray-200 w-20 h-5" />
          <div className="bg-gray-200 w-20 h-5" />
        </div>
      </div>
      {/* 상품 설명 */}
      <div className="border-b py-8">
        <div className="text-lg font-semibold">
          설명 <span className="text-red-500">*</span>
        </div>
        <div className="bg-gray-200 w-full h-56 mt-5 rounded-sm animate-pulse" />
      </div>
      {/* 버튼 */}
      <div className="flex justify-end gap-3 mt-5 animate-pulse">
        <div className="bg-gray-200 w-[96px] h-[42px]" />
        <div className="bg-gray-200 w-[96px] h-[42px]" />
      </div>
    </>
  );
}
