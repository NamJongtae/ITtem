import useNavProduct from "@/shared/layout/hooks/useNavProduct";
import ProductIcon from "@/public/icons/product-icon.svg";

export default function ProductBtn() {
  const { pathname, handleClickProduct } = useNavProduct();

  return (
    <button
      onClick={handleClickProduct}
      className={`inline-flex flex-col items-center gap-[2px] text-xs ${
        pathname === "/product/manage" && "text-indigo-500"
      }`}
    >
      <ProductIcon
        className={`${
          pathname === "/product/manage" ? "fill-indigo-500" : "fill-black"
        } w-5 h-5`}
      />
      상품
    </button>
  );
}
