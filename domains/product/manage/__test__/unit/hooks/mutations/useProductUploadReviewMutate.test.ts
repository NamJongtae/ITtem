import { renderHook, act, waitFor } from "@testing-library/react";
import useProductUploadReviewMutate from "@/domains/product/manage/hooks/mutations/useProductUploadReviewMutate";
import uploadProductReview from "@/domains/product/manage/api/uploadProductReview";
import { toast } from "react-toastify";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";

jest.mock("@/domains/product/manage/api/uploadProductReview");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    warn: jest.fn()
  }
}));

describe("useProductUploadReviewMutate 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();
  const mockUploadProductReview = uploadProductReview as jest.Mock;
  const closeModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mutationParams = {
    productId: "product123",
    reviewScore: 5,
    reviewContent: "정말 좋은 제품입니다!",
    reviewTags: [1, 2]
  };

  it("onSuccess 시 toast.success, closeModal, invalidateQueries을 호출합니다.", async () => {
    const mockMessage = "리뷰 등록 완료";
    mockUploadProductReview.mockResolvedValue({
      data: { message: mockMessage }
    });

    const invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(
      () => useProductUploadReviewMutate(closeModal),
      { wrapper }
    );

    act(() => {
      result.current.uploadReviewMutate(mutationParams);
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(mockMessage);
      expect(closeModal).toHaveBeenCalled();
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: queryKeys.product.manage._def
      });
    });
  });

  it("onError 시 axios 에러일 경우 toast.warn, stopLoading을 호출합니다.", async () => {
    const error = {
      isAxiosError: true,
      response: { data: { message: "에러 발생" } }
    };
    mockUploadProductReview.mockRejectedValue(error);

    const { result } = renderHook(
      () => useProductUploadReviewMutate(closeModal),
      { wrapper }
    );

    act(() => {
      result.current.uploadReviewMutate(mutationParams);
    });

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith("에러 발생");
      expect(closeModal).not.toHaveBeenCalled();
    });
  });

  it("onError 시 axios 에러가 아닐 경우 toast.warn을 호출하지 않습니다.", async () => {
    const error = new Error("일반 에러");
    mockUploadProductReview.mockRejectedValue(error);

    const { result } = renderHook(
      () => useProductUploadReviewMutate(closeModal),
      { wrapper }
    );

    act(() => {
      result.current.uploadReviewMutate(mutationParams);
    });

    await waitFor(() => {
      expect(toast.warn).not.toHaveBeenCalled();
      expect(closeModal).not.toHaveBeenCalled();
    });
  });
});
