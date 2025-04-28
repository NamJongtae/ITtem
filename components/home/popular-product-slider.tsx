"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import usePopularProductQuery from "@/hooks/react-query/queries/product/usePopularProductQuery";
import Link from "next/link";
import ProductListContent from "../commons/product-list/product-list-content";
import FallbackImage from "../commons/fallback-Image";

export default function PopularProductSlider() {
  const { data, isLoading } = usePopularProductQuery();

  if (isLoading) {
    return (
      <div className="w-full h-[340px] mx-auto animate-pulse bg-gray-300 px-8" />
    );
  }

  return (
    <Swiper
      className="w-full h-[340px]"
      modules={[Autoplay]}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
          slidesPerGroup: 1
        },
        480: {
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
      }}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false
      }}
      scrollbar={{ draggable: true }}
    >
      {data?.map((data) => (
        <SwiperSlide key={data._id}>
          <div className="relative w-full h-[340px] mx-auto">
            <Link
              href={`/product/${data._id}`}
              className="mx-auto group flex w-full h-full max-w-xs flex-col overflow-hidden bg-white border "
            >
              <div className="w-full h-full overflow-hidden">
                <FallbackImage
                  className="w-full h-full object-cover object-center aspect-square"
                  src={data.imgData[0].url}
                  alt={data.name}
                  width={300}
                  height={300}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                />
              </div>

              <ProductListContent
                data={{
                  name: data.name,
                  createdAt: data.createdAt,
                  price: data.price,
                  location: data.location
                }}
              />
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
