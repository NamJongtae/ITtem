import { useRouter, usePathname } from "next/navigation";

export default function useNavProduct() {
  const router = useRouter();
  const pathname = usePathname();
  const handleClickProduct = () => {
    router.push("/product/manage");
  };

  return { pathname, handleClickProduct };
}
