import useNavProduct from "@/hooks/commons/layout/useNavProduct";
import MyProduct from "@/public/icons/product_icon.svg";
import Link from "next/link";

export default function NavProduct() {
  const { pathname } = useNavProduct();

  return (
    <Link
      href={"/product/manage?status=TRADING"}
      className={`inline-flex flex-col items-center gap-[2px] text-xs ${
        pathname === "/product/manage" && "text-indigo-500"
      }`}
    >
      <MyProduct
        className={`${
          pathname === "/product/manage" ? "fill-indigo-500" : "fill-black"
        } w-5 h-5`}
      />
      상품
    </Link>
  );
}
