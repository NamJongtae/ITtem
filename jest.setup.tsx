import "@testing-library/jest-dom";
jest.mock("next/navigation");
jest.mock("swiper/css", () => ({}));
jest.mock("swiper/css/navigation", () => ({}));
jest.mock("swiper/css/pagination", () => ({}));
jest.mock("swiper/css/autoplay", () => ({}));
jest.mock("swiper/modules", () => ({
  Navigation: { name: "Navigation" },
  Pagination: { name: "Pagination" },
  Autoplay: { name: "Autoplay" },
  EffectFade: { name: "EffectFade" },
  Thumbs: { name: "Thumbs" }
}));
jest.mock("swiper/react", () => ({
  Swiper: ({ children, modules, autoplay, loop, navigation }: any) => (
    <div
      data-testid="swiper"
      data-modules={Array.isArray(modules) ? modules.map((m: any) => m.name).join(",") : ""}
      data-autoplay={JSON.stringify(autoplay)}
      data-loop={loop}
      data-navigation={navigation}
    >
      {children}
    </div>
  ),
  SwiperSlide: ({ children }: any) => (
    <div data-testid="swiper-slide">{children}</div>
  )
}));
