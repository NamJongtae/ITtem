import useProductQuery from "../react-query/queries/product/useProductQuery";
import useAddRecentProduct from "./useAddRecentProduct";

export default function useProductDetailPage() {
  const { productDetailData, loadProductLoading, loadProductError } =
    useProductQuery();

  useAddRecentProduct(productDetailData);

  return { productDetailData, loadProductLoading, loadProductError };
}
