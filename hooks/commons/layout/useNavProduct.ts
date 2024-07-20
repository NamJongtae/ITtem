import { useRouter, usePathname } from "next/navigation";

export default function useNavProduct() {
  const router = useRouter();
  const pathname = usePathname();
  const handleClickProduct = () => {
    router.push("/product/manage?status=TRADING");
  };

  return { pathname, handleClickProduct };
}
