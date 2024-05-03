"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { ProductImgData } from '@/types/productTypes';

interface IProps {
  imgData: ProductImgData[] | undefined;
  imgWidth: number;
  imgHeight: number;
}

export default function ImgSlider({ imgData, imgWidth, imgHeight }: IProps) {
  return (
    <>
      <Swiper
        className="w-full h-full aspect-square"
        modules={[Navigation, Pagination]}
        navigation
        slidesPerView={1}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {imgData?.map((data, index) => (
          <SwiperSlide key={data.url}>
            <Image
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
