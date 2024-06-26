import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Portal from "@/components/commons/portal/Portal";
import { ProductImgData } from "@/types/productTypes";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface IProps {
  imgData: ProductImgData[] | undefined;
  closeModal: () => void;
}

export default function ProductImgEnlargeModal({
  imgData,
  closeModal,
}: IProps) {
  return (
    <Portal>
      <div className="absolute bg-black  rounded-sm w-full h-full inset-0 z-50">
        <Swiper
          className="absolute top-1/2 -translate-y-1/2 w-full h-full max-w-7xl max-h-[400px] sm:max-h-[500px] md:max-h-[600px]"
          lazyPreloadPrevNext={1}
          modules={[Navigation, Pagination]}
          navigation
          slidesPerView={1}
          spaceBetween={30}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {imgData?.map((data, index) => (
            <SwiperSlide key={data.url + index} className="relative">
              <Image
                className="w-auto h-auto object-contain obeject-center"
                src={data.url}
                alt={data.name}
                fill
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          onClick={closeModal}
          className="absolute text-white top-5 right-5 w-5 h-5 sm:w-auto sm:h-auto sm:top-8 sm:right-8 z-50"
        >
          <Image src={"/icons/x_icon.svg"} alt="닫기" width={30} height={30} />
        </button>
      </div>
    </Portal>
  );
}
