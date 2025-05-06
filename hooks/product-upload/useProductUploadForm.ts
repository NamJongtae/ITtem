import useProductUploadSubmit from "./useProductUploadSubmit";
import useProductQuery from "../react-query/queries/product/useProductQuery";
import useProductEditSubmit from "./useProductEditSubmit";
import { useEffect, useState } from "react";

interface IParams {
  isEdit?: boolean;
}

export default function useProductUploadForm({ isEdit }: IParams) {
  const [isSubmitLoading, setSubmitLoading] = useState(false);

  const changeSubmitLoading = (isLoading: boolean) => {
    setSubmitLoading(isLoading);
  };

  const {
    handleClickProductUploadSubmit,
    productUploadLoading,
    productUploadError
  } = useProductUploadSubmit();

  const { productDetailData, loadProductLoading, loadProductError } =
    useProductQuery(isEdit);

  const { handleClickProductEditSubmit, productEditLoading, productEditError } =
    useProductEditSubmit();

  const isLoading = loadProductLoading || isSubmitLoading;
  const isError = loadProductError;

  useEffect(() => {
    if (productUploadLoading || productEditLoading) {
      document.body.style.overflow = "hidden";
      changeSubmitLoading(true);
    }
  }, [productEditLoading, productUploadLoading]);

  useEffect(() => {
    if (productUploadError || productEditError) {
      document.body.style.overflow = "auto";
      changeSubmitLoading(false);
    }
  }, [productUploadError, productEditError]);

  return {
    handleClickProductUploadSubmit,
    handleClickProductEditSubmit,
    productDetailData,
    isLoading,
    isError
  };
}
