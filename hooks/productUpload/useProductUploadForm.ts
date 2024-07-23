import useProductUploadSubmit from "./useProductUploadSubmit";
import useProductQuery from "../reactQuery/queries/product/useProductQuery";
import useProductEditSubmit from "./useProductEditSubmit";

interface IParams {
  isEdit?: boolean;
}

export default function useProductUploadForm({ isEdit }: IParams) {
  const { handleClickProductUploadSubmit, productUploadLoading } =
    useProductUploadSubmit();

  const { productDetailData, loadProductLoading, loadProductError } =
    useProductQuery(isEdit);

  const { handleClickProductEditSubmit, productEditLoading } =
    useProductEditSubmit();

  const isLoading =
    loadProductLoading || productUploadLoading || productEditLoading;
  const isError = loadProductError;

  return {
    handleClickProductUploadSubmit,
    handleClickProductEditSubmit,
    productDetailData,
    isLoading,
    isError,
  };
}
