import Image from "next/image";
import ImgSlider from "../../commons/img-slider/img-slider";
import { ProductDetailData, ProductStatus } from "@/types/product-types";
import ProductImgEnlargeModal from "../../commons/product-img-enlarge-modal";
import useModal from "@/hooks/commons/useModal";
import useProductDetailImgStyle from "@/hooks/product-detail/useProductDetailImgStyles";

interface IProps {
  productDetailData: ProductDetailData | undefined;
}

export default function ProductDetailContentImg({ productDetailData }: IProps) {
  const { isOpenModal, openModal, handleClickCloseBtn } = useModal({
    isImageModal: true
  });

  const { imgStyle } = useProductDetailImgStyle({
    status: productDetailData?.status
  });

  return (
    <>
      <div className="w-full h-80 md:h-80 md:w-1/2 lg:h-96">
        <div
          className={`relative w-full h-full h-70 max-w-[512px] max-h-[384px] mx-auto rounded-md overflow-hidden ${
            productDetailData?.status !== ProductStatus.sold ? imgStyle : ""
          }`}
        >
          <ImgSlider
            imgData={productDetailData?.imgData}
            imgWidth={512}
            imgHeight={384}
            isNavigation={true}
            isPagination={true}
          />
          <button
            className="absolute z-10 bottom-3 right-3 border bg-white p-1 text-xs rounded-md betterhover:hover:bg-gray-100 group:hover-block inline-flex gap-1 items-center"
            onClick={openModal}
          >
            <Image
              src="/icons/search-icon.svg"
              alt="자세히"
              width={16}
              height={16}
            />{" "}
            이미지 확대
          </button>
        </div>
      </div>
      {isOpenModal && (
        <ProductImgEnlargeModal
          imgData={productDetailData?.imgData}
          handleClickCloseBtn={handleClickCloseBtn}
        />
      )}
    </>
  );
}
