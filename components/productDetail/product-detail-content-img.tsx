import Image from "next/image";
import ImgSlider from "../commons/imgSlider/img-slider";
import { ProductData } from "@/types/productTypes";
import useModal from "@/hooks/commons/useModal";
import ProductImgEnlargeModal from "../productUpload/imgField/product-img-enlarge-modal";

interface IProps {
  productData: ProductData | undefined;
}

export default function ProductDetailContentImg({ productData }: IProps) {
  const { isOpenModal, openModal, closeModal } = useModal();

  return (
    <>
      <div className="w-full h-80 md:h-80 md:w-1/2 lg:h-96">
        <div className="relative w-full h-full h-70 max-w-[512px] max-h-[384px] mx-auto rounded-md overflow-hidden">
          <ImgSlider
            imgData={productData?.imgData}
            imgWidth={512}
            imgHeight={384}
          />
          <button
            className="absolute z-10 bottom-3 right-3 border bg-white p-1 text-xs rounded-md betterhover:hover:bg-gray-100 group:hover-block inline-flex gap-1 items-center"
            onClick={openModal}
          >
            <Image
              src="/icons/search_icon.svg"
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
          imgData={productData?.imgData}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
