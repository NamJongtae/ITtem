import useProductQuery from "../reactQuery/queries/product/useProductQuery";
import useAddRecentProduct from "./useAddRecentProduct";

export default function useProductDetailPage() {
  const { productDetailData, loadProductLoading, loadProductError } =
    useProductQuery();

  useAddRecentProduct(productDetailData);

  return { productDetailData, loadProductLoading, loadProductError };
}
