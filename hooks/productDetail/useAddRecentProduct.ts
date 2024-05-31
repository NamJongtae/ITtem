import { ProductDetailData, RecentProductData } from '@/types/productTypes';
import { useEffect } from 'react';

export default function useAddRecentProduct(productDetailData: ProductDetailData | undefined) {
  useEffect(() => {
    const recentProductKey = "recentProduct";
    const maxRecentProducts = 10;
    const productDetail = {
      productId: productDetailData?._id,
      productName: productDetailData?.name,
      productImg: productDetailData?.imgData[0].url,
    };

    const recentProduct = JSON.parse(
      localStorage.getItem(recentProductKey) || "[]"
    ) as RecentProductData[];

    const filteredRecent = recentProduct.filter(
      (product) => product.productId !== productDetail.productId
    );

    filteredRecent.unshift({
      productId: productDetailData?._id || "",
      productImg: productDetailData?.imgData[0].url || "",
      productName: productDetailData?.name || "",
    });

    if (filteredRecent.length > maxRecentProducts) {
      filteredRecent.pop();
    }

    localStorage.setItem(recentProductKey, JSON.stringify(filteredRecent));
  }, []);
}
