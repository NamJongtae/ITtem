import { renderHook, act } from "@testing-library/react";
import useProductPurchaseHandler from "../../../hooks/useProductPurchaseHandler";
import usePurchaseProductMutate from "../../../hooks/mutations/usePurchaseProductMutate";
import { toast } from "react-toastify";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { ProductStatus } from "@/domains/product/shared/types/productTypes";

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));
jest.mock("../../../hooks/mutations/usePurchaseProductMutate");
jest.mock("@/domains/auth/shared/common/store/authStore");

describe("useProductPurchaseHandler", () => {
  const mockUseAuthStore = useAuthStore as unknown as jest.Mock;
  const mockUsePurchaseProductMutate = usePurchaseProductMutate as jest.Mock;
  const mockToastWarn = toast.warn as jest.Mock;

  const mockMutate = jest.fn();
  const mockConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    global.confirm = mockConfirm;

    mockUsePurchaseProductMutate.mockReturnValue({
      purchaseProductMutate: mockMutate
    });

    mockUseAuthStore.mockImplementation((selector) =>
      selector({ user: { uid: "user123" } })
    );
  });

  it("상품 상태가 'trading'이면 toast.warn이 호출됩니다.", () => {
    const { result } = renderHook(() =>
      useProductPurchaseHandler({ productStatus: ProductStatus.trading })
    );

    act(() => {
      result.current.handleClickPurchase();
    });

    expect(mockToastWarn).toHaveBeenCalledWith("이미 거래중인 상품이에요.");
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("상품 상태가 'soldout'이면 toast.warn이 호출됩니다.", () => {
    const { result } = renderHook(() =>
      useProductPurchaseHandler({ productStatus: ProductStatus.soldout })
    );

    act(() => {
      result.current.handleClickPurchase();
    });

    expect(mockToastWarn).toHaveBeenCalledWith("이미 판매된 상품이에요.");
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("로그인하지 않은 경우 toast.warn이 호출됩니다.", () => {
    mockUseAuthStore.mockImplementation((selector) => selector({ user: null }));

    const { result } = renderHook(() =>
      useProductPurchaseHandler({ productStatus: ProductStatus.sold })
    );

    act(() => {
      result.current.handleClickPurchase();
    });

    expect(mockToastWarn).toHaveBeenCalledWith("로그인 후 이용해주세요.");
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("confirm이 false면 mutate가 호출되지 않습니다.", () => {
    mockConfirm.mockReturnValue(false);

    const { result } = renderHook(() =>
      useProductPurchaseHandler({ productStatus: ProductStatus.sold })
    );

    act(() => {
      result.current.handleClickPurchase();
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("모든 조건 만족 & confirm이 true면 mutate가 호출됩니다.", () => {
    mockConfirm.mockReturnValue(true);

    const { result } = renderHook(() =>
      useProductPurchaseHandler({ productStatus: ProductStatus.sold })
    );

    act(() => {
      result.current.handleClickPurchase();
    });

    expect(mockMutate).toHaveBeenCalled();
  });
});
