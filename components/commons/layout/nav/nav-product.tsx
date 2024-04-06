import MyProduct from "@/public/icons/product_icon.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavProduct() {
  const pathname = usePathname();

  return (
    <Link
      href={"/product/manage"}
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
