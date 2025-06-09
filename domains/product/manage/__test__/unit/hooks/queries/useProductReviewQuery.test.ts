import { renderHook } from "@testing-library/react";
import useProductReviewQuery from "@/domains/product/manage/hooks/queries/useProductReviewQuery";
import { toast } from "react-toastify";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import { useSuspenseQuery } from "@tanstack/react-query";

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

jest.mock("@tanstack/react-query", () => {
  const original = jest.requireActual("@tanstack/react-query");
  return {
    ...original,
    useSuspenseQuery: jest.fn()
  };
});

describe("useProductReviewQuery 훅 테스트", () => {
  const mockUseSuspenseQuery = useSuspenseQuery as jest.Mock;
  const mockCloseModal = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("data, isLoading, error를 정상적으로 반환하는지 확인합니다.", () => {
    const mockData = { review: "리뷰 내용" };
    mockUseSuspenseQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null
    });

    const { result } = renderHook(
      () =>
        useProductReviewQuery({
          productId: "product123",
          closeModal: mockCloseModal
        }),
      {
        wrapper: createQueryClientWrapper().Wrapper
      }
    );

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(toast.warn).not.toHaveBeenCalled();
    expect(mockCloseModal).not.toHaveBeenCalled();
  });

  it("Axios 에러가 발생한 경우 toast.warn, closeModal을 호출합니다.", () => {
    const axiosError = {
      isAxiosError: true,
      response: {
        data: {
          message: "리뷰 로딩 실패"
        }
      }
    };

    mockUseSuspenseQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: axiosError
    });

    renderHook(
      () =>
        useProductReviewQuery({
          productId: "product123",
          closeModal: mockCloseModal
        }),
      {
        wrapper: createQueryClientWrapper().Wrapper
      }
    );

    expect(toast.warn).toHaveBeenCalledWith("리뷰 로딩 실패");
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it("일반 에러가 발생한 경우 toast.warn을 호출하지 않습니다.", () => {
    const normalError = new Error("일반 에러");

    mockUseSuspenseQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: normalError
    });

    renderHook(
      () =>
        useProductReviewQuery({
          productId: "product123",
          closeModal: mockCloseModal
        }),
      {
        wrapper: createQueryClientWrapper().Wrapper
      }
    );

    expect(toast.warn).not.toHaveBeenCalled();
    expect(mockCloseModal).toHaveBeenCalled();
  });
});
