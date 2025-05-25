"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

const BANNER_IMG = ["/images/banner.png", "/images/banner2.png"];

export default function Banner() {
  return (
    <section className="relative mx-auto max-w-[1024px] px-8 w-full h-auto">
      <h2 className="sr-only">광고 배너</h2>
      <Swiper
        className="w-full h-full"
        modules={[Autoplay]}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
      >
        {BANNER_IMG.map((src) => (
          <SwiperSlide key={src} className="w-full h-full">
            <Image
              className="w-full h-full object-cover object-center aspect-[256/75]"
              src={src}
              quality={100}
              width={1024}
              height={300}
              priority
              alt="새로운 시작, 특별한 발견 잇템에서 시작하세요!"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
