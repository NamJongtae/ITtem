"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

interface IProps {
  imgUrls: string[];
  imgWidth: number;
  imgHeight: number;
}

export default function ImgSlider({ imgUrls, imgWidth, imgHeight }: IProps) {
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
        {imgUrls.map((url, index) => (
          <SwiperSlide key={url}>
            <Image
              className="h-full w-full object-cover object-center"
              src={url}
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
