import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Portal from "@/components/commons/portal/Portal";
import { ProductImgData } from "@/types/productTypes";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import FallbackImage from "@/components/commons/fallback-Image";
import XIcon from "@/public/icons/x_icon.svg";
interface IProps {
  imgData: ProductImgData[] | undefined;
  handleClickCloseBtn: () => void;
}

export default function ProductImgEnlargeModal({
  imgData,
  handleClickCloseBtn,
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
              <FallbackImage
                className="w-auto h-auto object-contain obeject-center"
                src={data.url}
                alt={data.name}
                fill
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          onClick={handleClickCloseBtn}
          className="absolute text-white top-5 right-5 w-5 h-5 sm:w-auto sm:h-auto sm:top-8 sm:right-8 z-50"
        >
          <XIcon className="fill-white w-6 h-6" aria-label="닫기" />
        </button>
      </div>
    </Portal>
  );
}
