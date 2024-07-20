import { usePathname, useRouter } from "next/navigation";

export default function useNavSell() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClickSell = () => {
    router.push("/product/upload");
  };
  return { pathname, handleClickSell };
}
