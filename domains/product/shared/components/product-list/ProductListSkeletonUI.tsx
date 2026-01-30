import ProductItemSkeletonUI from "./ProductItemSkeletonUI";

interface IProps {
  listCount?: number;
}

export default function ProductListSkeletonUI({ listCount = 12 }: IProps) {
  return (
    <div className="max-w-[1024px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-6 px-8">
      {Array.from({ length: listCount }).map((_, index) => (
        <ProductItemSkeletonUI key={index} />
      ))}
    </div>
  );
}
