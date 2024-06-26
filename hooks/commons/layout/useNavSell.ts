import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

export default function useNavSell() {
  const router = useRouter();
  const pathname = router.pathname;

  const handleClickSell = () => {
    router.push("/product/upload");
  };
  return { pathname, handleClickSell };
}
