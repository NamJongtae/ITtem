import ProductItemSkeletonUI from "./product-item-skeletonUI";

interface IProps {
  listCount?: number;
}

export default function ProductListSkeletonUI({ listCount = 10 }: IProps) {
  return (
    <ul className="max-w-[1024px] mx-auto grid gap-5 grid-cols-autoFill my-6 px-8">
      {Array.from({ length: listCount }).map((_, index) => (
        <ProductItemSkeletonUI key={index} />
      ))}
    </ul>
  );
}
