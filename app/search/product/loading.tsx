import Spinner from "@/components/commons/spinner";

export default function ProductSearchloading() {
  return (
    <div className="relative max-w-[1024px] h-full mx-auto px-8 animate-pulse">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col justify-center items-center gap-2">
          <Spinner />
          <p className="text-center">상품 검색중...</p>
        </div>
      </div>
    </div>
  );
}
