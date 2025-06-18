import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FallbackImage from "@/shared/common/components/FallbackImage";

// Next.js Image 컴포넌트를 모킹
jest.mock("next/image", () => {
  return function MockedImage({ src, alt, onError, ...props }: any) {
    return (
      <img
        src={src}
        alt={alt}
        onError={onError}
        data-testid="fallback-image"
        {...props}
      />
    );
  };
});

describe("FallbackImage 컴포넌트 테스트", () => {
  const defaultProps = {
    src: "/images/test-image.jpg",
    alt: "Test image",
    width: 100,
    height: 100
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("컴포넌트가 정상적으로 렌더링되어야 합니다.", () => {
    render(<FallbackImage {...defaultProps} />);

    const image = screen.getByTestId("fallback-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/images/test-image.jpg");
    expect(image).toHaveAttribute("alt", "Test image");
  });

  it("정상적인 이미지가 로드될 때 fallback이 호출되지 않아야 합니다.", () => {
    const onErrorMock = jest.fn();

    render(<FallbackImage {...defaultProps} onError={onErrorMock} />);

    const image = screen.getByTestId("fallback-image");
    expect(image).toHaveAttribute("src", "/images/test-image.jpg");
    expect(onErrorMock).not.toHaveBeenCalled();
  });

  it("이미지 로드 실패 시 fallback 이미지가 표시되어야 합니다.", () => {
    render(<FallbackImage {...defaultProps} />);

    const image = screen.getByTestId("fallback-image");

    // 이미지 로드 실패 시뮬레이션
    fireEvent.error(image);

    expect(image).toHaveAttribute("src", "/images/no-image.png");
  });

  it("이미지 로드 실패 후 상태가 올바르게 변경되어야 합니다.", () => {
    render(<FallbackImage {...defaultProps} />);

    const image = screen.getByTestId("fallback-image");

    // 초기 상태 확인
    expect(image).toHaveAttribute("src", "/images/test-image.jpg");

    // 에러 발생
    fireEvent.error(image);

    // fallback 이미지로 변경 확인
    expect(image).toHaveAttribute("src", "/images/no-image.png");
  });

  it("커스텀 fallbackSrc가 올바르게 적용되어야 합니다.", () => {
    const customFallback = "/images/custom-fallback.jpg";

    render(<FallbackImage {...defaultProps} fallbackSrc={customFallback} />);

    const image = screen.getByTestId("fallback-image");
    fireEvent.error(image);

    expect(image).toHaveAttribute("src", customFallback);
  });

  it("alt prop이 제공되지 않을 때 빈 문자열이 사용되어야 합니다.", () => {
    const { src, width, height } = defaultProps;

    render(<FallbackImage alt="" src={src} width={width} height={height} />);

    const image = screen.getByTestId("fallback-image");
    expect(image).toHaveAttribute("alt", "");
  });

  it("alt prop이 제공될 때 올바르게 전달되어야 합니다.", () => {
    render(<FallbackImage {...defaultProps} alt="Custom alt text" />);

    const image = screen.getByTestId("fallback-image");
    expect(image).toHaveAttribute("alt", "Custom alt text");
  });

  it("추가 props가 올바르게 전달되어야 합니다.", () => {
    render(<FallbackImage {...defaultProps} className="custom-class" />);

    const image = screen.getByTestId("fallback-image");
    expect(image).toHaveClass("custom-class");
  });
});
