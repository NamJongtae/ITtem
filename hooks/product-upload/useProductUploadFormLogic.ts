import useProductUploadSubmit from "./useProductUploadSubmit";
import useProductQuery from "../react-query/queries/product/useProductQuery";
import useProductEditSubmit from "./useProductEditSubmit";
import { useEffect, useState } from "react";

interface IParams {
  isEdit?: boolean;
}

export default function useProductUploadFormLogic({ isEdit }: IParams) {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const isLoading = loadProductLoading || isSubmitting;
  const isError = loadProductError || productUploadError || productEditError;
  const onSubmit = isEdit ? productEditSubmit : productUploadSubmit;

  useEffect(() => {
    if (productUploadLoading || productEditLoading) {
      setIsSubmitting(true);
    }
  }, [productUploadLoading, productEditLoading, setIsSubmitting]);

  useEffect(() => {
    if (isError) {
      setIsSubmitting(false);
    }
  }, [isError]);

  return {
    onSubmit,
    productDetailData,
    isLoading,
    loadProductLoading,
    isError
  };
}
