import useProductUploadSubmit from "./useProductUploadSubmit";
import useProductQuery from "../react-query/queries/product/useProductQuery";
import useProductEditSubmit from "./useProductEditSubmit";

interface IParams {
  isEdit?: boolean;
}

export default function useProductUploadFormLogic({ isEdit }: IParams) {
  const {
    onSubmit: productUploadSubmit,
    productUploadLoading,
    productUploadError
  } = useProductUploadSubmit();

  const { productDetailData, loadProductLoading, loadProductError } =
    useProductQuery(isEdit);

  const {
    onSubmit: productEditSubmit,
    productEditLoading,
    productEditError
  } = useProductEditSubmit();

  const isLoading =
    loadProductLoading || productUploadLoading || productEditLoading;
  const isError = loadProductError || productUploadError || productEditError;
  const onSubmit = isEdit ? productEditSubmit : productUploadSubmit;

  return {
    onSubmit,
    productDetailData,
    isLoading,
    loadProductLoading,
    isError
  };
}
