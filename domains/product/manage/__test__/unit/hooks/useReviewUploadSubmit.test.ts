import { renderHook, act } from "@testing-library/react";
import useReviewUploadSubmit from "../../../hooks/useReviewUploadSubmit";
import useProductUploadReviewMutate from "../../../hooks/mutations/useProductUploadReviewMutate";

jest.mock("../../../hooks/mutations/useProductUploadReviewMutate");

describe("useReviewUploadSubmit 훅 테스트", () => {
  const mockMutate = jest.fn();
  const mockCloseModal = jest.fn();
  const mockUseProductUploadReviewMutate =
    useProductUploadReviewMutate as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseProductUploadReviewMutate.mockReturnValue({
      uploadReviewMutate: mockMutate,
      uploadReviewLoading: false
    });
  });

  it("onSubmit 호출 시 confirm에서 확인을 누르면 uploadReviewMutate가 호출됩니다.", () => {
    jest.spyOn(window, "confirm").mockReturnValue(true);

    const { result } = renderHook(() =>
      useReviewUploadSubmit({
        closeModal: mockCloseModal,
        productId: "product-1"
      })
    );

    const values = {
      score: 5,
      content: "좋아요",
      tags: [1, 0, 1]
    };

    act(() => {
      result.current.onSubmit(values);
    });

    expect(window.confirm).toHaveBeenCalledWith(
      "정말 리뷰를 작성 하겠어요? 등록 후 삭제/수정이 불가능합니다."
    );
    expect(mockMutate).toHaveBeenCalledWith({
      productId: "product-1",
      reviewScore: 5,
      reviewContent: "좋아요",
      reviewTags: [1, 0, 1]
    });
  });

  it("onSubmit 호출 시 confirm에서 취소를 누르면 uploadReviewMutate가 호출되지 않습니다.", () => {
    jest.spyOn(window, "confirm").mockReturnValue(false);

    const { result } = renderHook(() =>
      useReviewUploadSubmit({
        closeModal: mockCloseModal,
        productId: "product-1"
      })
    );

    const values = {
      score: 5,
      content: "좋아요",
      tags: [1, 1, 1]
    };

    act(() => {
      result.current.onSubmit(values);
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("uploadReviewLoading이 반환되는지 확인합니다.", () => {
    mockUseProductUploadReviewMutate.mockReturnValue({
      uploadReviewMutate: mockMutate,
      uploadReviewLoading: true
    });

    const { result } = renderHook(() =>
      useReviewUploadSubmit({
        closeModal: mockCloseModal,
        productId: "product-1"
      })
    );

    expect(result.current.uploadReviewLoading).toBe(true);
  });
});
