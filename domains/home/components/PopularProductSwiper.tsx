"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import PopularProductSliderItem from "./PopularProductSliderItem";
import { ProductData } from "@/domains/product/shared/types/productTypes";

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

export default function PopularProductSwiper({
  data
}: {
  data: ProductData[] | undefined;
}) {
  return (
    <Swiper
      className="w-full h-[340px]"
      modules={[Autoplay]}
      breakpoints={swiperBreakPoints}
      loop={(data?.length ?? 0 > 0) ? true : false}
      autoplay={(data?.length ?? 0 > 0) ? {
        delay: 3000,
        disableOnInteraction: false
      } : false}
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
