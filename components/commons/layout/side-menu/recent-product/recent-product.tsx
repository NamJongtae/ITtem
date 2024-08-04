import RecentProductSlider from "./recent-product-slider";

export default function RecentProduct() {
  const rencentProduct =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("recentProduct") || "[]")
      : [];

  return (
    <div className="hidden sm:block mb-3 bg-white border text-sm p-2 min-h-36">
      <h2 className="border-b border-b-gray-500 pb-2 border-dashed text-gray-500 font-semibold text-center">
        최근 본 상품
      </h2>
      {rencentProduct.length === 0 ? (
        <p className="text-center mt-5 text-[11px] leading-4 max-w-[100px] text-wrap break-keep">
          최근 본 상품이 존재하지 않습니다.
        </p>
      ) : (
        <RecentProductSlider />
      )}
    </div>
  );
}
