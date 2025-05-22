"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import usePopularProductQuery from "@/domains/product/hooks/queries/usePopularProductQuery";
import PopularProductSliderItem from "./popular-product-slider-item";

export default function PopularProductSlider() {
  const { data } = usePopularProductQuery();
  const swiperBreakPoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
      slidesPerGroup: 1
    },
    540: {
      slidesPerView: 2,
      spaceBetween: 20,
      slidesPerGroup: 2
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerGroup: 3
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 30,
      slidesPerGroup: 4
    }
  };

  return (
    <Swiper
      className="w-full h-[340px]"
      modules={[Autoplay]}
      breakpoints={swiperBreakPoints}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false
      }}
      scrollbar={{ draggable: true }}
    >
      {data?.map((data) => (
        <SwiperSlide key={data._id}>
          <PopularProductSliderItem data={data} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
