import { RootState } from "@/store/store";
import { ProductData } from "@/types/productTypes";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function useProductEditCheckUser(
  productData: ProductData | undefined,
  isEdit?: boolean
) {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (isEdit && user?.uid !== productData?.uid) {
      router.replace("/");
    }
  }, []);
}
