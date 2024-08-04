import { ProductDetailData, ProductStatus } from "@/types/product-types";
import useModal from "../commons/useModal";

interface IParams {
  productDetailData: ProductDetailData | undefined;
}

export default function useProductDetailContentImg({
  productDetailData,
}: IParams) {
  const { isOpenModal, openModal, closeModal, handleClickCloseBtn } =
    useModal();
  const imgBeforeStyle = `before:absolute before:inset-0 before:bg-gray-700 before:bg-opacity-50 before:z-10 before:text-white before:text-3xl before:font-semibold before:flex before:justify-center before:items-center ${
    productDetailData?.status === ProductStatus.soldout
      ? "before:content-['판매완료']"
      : "before:content-['거래중']"
  }`;

  return {
    imgBeforeStyle,
    isOpenModal,
    openModal,
    closeModal,
    handleClickCloseBtn,
  };
}
