import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ProductImgData } from '@/domains/product/types/product-types'; 
import FallbackImage from "../fallback-Image";

interface IProps {
  imgData: ProductImgData[] | undefined;
  imgWidth: number;
  imgHeight: number;
  isNavigation?: boolean;
  isPagination?: boolean;
  isAutoPlay?: boolean;
  isLoop?: boolean;
  playDelay?: number;
}

export default function ImgSlider({
  imgData,
  imgWidth,
  imgHeight,
  isNavigation,
  isPagination,
  isAutoPlay,
  isLoop,
  playDelay
}: IProps) {
  const swiperModules = [];
  if (isNavigation) swiperModules.push(Navigation);
  if (isPagination) swiperModules.push(Pagination);
  if (isAutoPlay) swiperModules.push(Autoplay);

  return (
    <>
      <Swiper
        className="w-full h-full aspect-square"
        modules={swiperModules}
        autoplay={{
          delay: playDelay || 3000
        }}
        loop={isLoop}
        navigation={isNavigation}
        slidesPerView={1}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {imgData?.map((data, index) => (
          <SwiperSlide key={data.url}>
            <FallbackImage
              className="h-full w-full object-cover object-center"
              src={data.url}
              width={imgWidth}
              height={imgHeight}
              alt={`img_${index}`}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
