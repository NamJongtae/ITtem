import React from "react";
import { render, screen } from "@testing-library/react";
import ImgSlider from "@/shared/common/components/ImgSlider";
import { ProductImgData } from "@/domains/product/shared/types/productTypes";

jest.mock("@/shared/common/components/FallbackImage", () => ({
  __esModule: true,
  default: ({ src, width, height, alt, className }: any) => (
    <img
      data-testid="fallback-image"
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={className}
    />
  )
}));

describe("ImgSlider 컴포넌트 테스트", () => {
  const mockImgData: ProductImgData[] = [
    { url: "test1.jpg", name: "test1" },
    { url: "test2.jpg", name: "test2" },
    { url: "test3.jpg", name: "test3" }
  ];

  const defaultProps = {
    imgData: mockImgData,
    imgWidth: 500,
    imgHeight: 500
  };

  it("기본 속성으로 렌더링됩니다.", () => {
    render(<ImgSlider {...defaultProps} />);

    const swiper = screen.getByTestId("swiper");
    const slides = screen.getAllByTestId("swiper-slide");
    const images = screen.getAllByTestId("fallback-image");

    expect(swiper).toBeInTheDocument();
    expect(slides).toHaveLength(3);
    expect(images).toHaveLength(3);
  });

  it("네비게이션과 페이지네이션이 활성화되면 해당 모듈이 포함됩니다.", () => {
    render(
      <ImgSlider {...defaultProps} isNavigation={true} isPagination={true} />
    );

    const swiper = screen.getByTestId("swiper");
    const modules = swiper.getAttribute("data-modules")?.split(",");

    expect(modules).toContain("Navigation");
    expect(modules).toContain("Pagination");
  });

  it("자동재생 옵션이 활성화되면 Autoplay 모듈이 포함됩니다.", () => {
    const playDelay = 5000;
    render(
      <ImgSlider {...defaultProps} isAutoPlay={true} playDelay={playDelay} />
    );

    const swiper = screen.getByTestId("swiper");
    const modules = swiper.getAttribute("data-modules")?.split(",");
    const autoplay = JSON.parse(swiper.getAttribute("data-autoplay") || "{}");

    expect(modules).toContain("Autoplay");
    expect(autoplay.delay).toBe(playDelay);
  });

  it("이미지가 올바른 속성으로 렌더링됩니다.", () => {
    render(<ImgSlider {...defaultProps} />);

    const images = screen.getAllByTestId("fallback-image");

    images.forEach((image, index) => {
      expect(image).toHaveAttribute("src", mockImgData[index].url);
      expect(image).toHaveAttribute("width", "500");
      expect(image).toHaveAttribute("height", "500");
      expect(image).toHaveAttribute("alt", `img_${index}`);
      expect(image).toHaveAttribute(
        "class",
        "h-full w-full object-cover object-center"
      );
    });
  });

  it("imgData가 undefined일 때 빈 슬라이더가 렌더링됩니다.", () => {
    render(<ImgSlider {...defaultProps} imgData={undefined} />);

    const slides = screen.queryAllByTestId("swiper-slide");
    expect(slides).toHaveLength(0);
  });
});
