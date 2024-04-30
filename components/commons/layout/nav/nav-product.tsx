import useDebouncing from "@/hooks/commons/useDebouncing";
import MyProduct from "@/public/icons/product_icon.svg";
import { RootState } from "@/store/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function NavProduct() {
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.auth.user);

  const debouncing = useDebouncing();

  const handleClickLink = debouncing((e: any) => {
    if (!user) {
      e.preventDefault();
      toast.warn("로그인 후 이용해주세요.");
    }
  }, 500);

  return (
    <Link
      onClick={handleClickLink}
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
