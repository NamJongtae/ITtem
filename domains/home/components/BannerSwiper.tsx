import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

const BANNER_IMG = ["/images/banner.png", "/images/banner2.png"];

export default function BannerSwiper() {
  return (
    <Swiper
      className="w-full h-full"
      modules={[Autoplay]}
      slidesPerView={1}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}
    >
      {BANNER_IMG.map((src, idx) => (
        <SwiperSlide key={src} className="w-full h-full">
          <Image
            className="w-full h-full object-cover object-center aspect-[256/75]"
            src={src}
            quality={100}
            width={1024}
            height={300}
            priority={idx === 0}
            alt="새로운 시작, 특별한 발견 잇템에서 시작하세요!"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
