import { RecentProductData } from "../types/layoutTypes";
import { useEffect } from "react";

export default function useAddRecentProduct({
  recentProduct,
  enabled
}: {
  recentProduct: RecentProductData | undefined;
  enabled: boolean;
}) {
  useEffect(() => {
    if (!enabled) return;
    
    const recentProductKey = "recentProduct";
    const maxRecentProducts = 10;
    const productDetail = { ...recentProduct };

    const recentProductList = JSON.parse(
      localStorage.getItem(recentProductKey) || "[]"
    ) as RecentProductData[];

    const filteredRecent = recentProductList.filter(
      (product) => product.productId !== productDetail.productId
    );

    if (recentProduct) {
      filteredRecent.unshift(recentProduct);

      if (filteredRecent.length > maxRecentProducts) {
        filteredRecent.pop();
      }

      localStorage.setItem(recentProductKey, JSON.stringify(filteredRecent));
    }
  }, [recentProduct, enabled]);
}
