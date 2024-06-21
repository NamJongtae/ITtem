import { useRouter } from "next/router";

export default function useNavProduct() {
  const router = useRouter();
  const pathname = router.pathname;
  const handleClickProduct = () => {
    router.push("/product/manage?status=TRADING");
  };

  return { pathname, handleClickProduct };
}
