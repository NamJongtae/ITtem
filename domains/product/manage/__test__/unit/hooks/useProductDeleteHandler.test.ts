import { renderHook, act } from "@testing-library/react";
import useProductDeleteHandler from "../../../hooks/useProductDeleteHandler";
import useProductDeleteMutate from "@/domains/product/shared/hooks/mutations/useProducDeletetMutate";

jest.mock("@/domains/product/shared/hooks/mutations/useProducDeletetMutate");

describe("useProductDeleteHandler 훅 테스트", () => {
  const mockMutate = jest.fn();
  const mockUseProductDeleteMutate = useProductDeleteMutate as jest.Mock;
  const productId = "test-product-id";

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseProductDeleteMutate.mockReturnValue({
      productDeleteMutate: mockMutate
    });
  });

  it("onClickProductDelete 호출 시 confirm이 true이면 productDeleteMutate가 호출됩니다.", () => {
    window.confirm = jest.fn(() => true);

    const { result } = renderHook(() => useProductDeleteHandler({ productId }));

    act(() => {
      result.current.onClickProductDelete();
    });

    expect(window.confirm).toHaveBeenCalledWith("정말 삭제 하겠어요?");
    expect(mockMutate).toHaveBeenCalled();
  });

  it("onClickProductDelete 호출 시 confirm이 false이면 productDeleteMutate가 호출되지 않는다", () => {
    window.confirm = jest.fn(() => false);

    const { result } = renderHook(() => useProductDeleteHandler({ productId }));

    act(() => {
      result.current.onClickProductDelete();
    });

    expect(window.confirm).toHaveBeenCalledWith("정말 삭제 하겠어요?");
    expect(mockMutate).not.toHaveBeenCalled();
  });
});
