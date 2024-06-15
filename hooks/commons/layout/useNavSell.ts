import { RootState } from "@/store/store";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import useDebouncing from "../useDebouncing";
import { toast } from "react-toastify";

export default function useNavSell() {
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.auth.user);

  const debouncing = useDebouncing();

  const handleClickLink = debouncing((e: any) => {
    if (!user) {
      e.preventDefault();
      toast.warn("로그인 후 이용해주세요.");
    }
  }, 300);

  return { pathname, handleClickLink };
}
