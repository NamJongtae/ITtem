import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import useProductUploadSubmit from "./useProductUploadSubmit";
import useProductQuery from "../reactQuery/mutations/product/useProductQuery";
import useProductEditSubmit from "./useProductEditSubmit";

interface IPrarms {
  isEdit?: boolean;
}

export default function useProductUploadForm({ isEdit }: IPrarms) {
  const user = useSelector((state: RootState) => state.auth.user);

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
    user,
    handleClickProductUploadSubmit,
    handleClickProductEditSubmit,
    productDetailData,
    isLoading,
    isError,
  };
}
