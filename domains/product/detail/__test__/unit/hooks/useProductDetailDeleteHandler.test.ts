import { renderHook, act } from "@testing-library/react";
import useProductDetailDeleteHandler from "../../../hooks/useProductDetailDeleteHandler";
import useProductDeleteMutate from "@/domains/product/shared/hooks/mutations/useProductDeleteMutate";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));
jest.mock("@/domains/product/shared/hooks/mutations/useProductDeleteMutate");
jest.mock("@/domains/auth/shared/common/store/authStore");

import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { ProductStatus } from "@/domains/product/shared/types/productTypes";
describe("useProductDetailDeleteHandler", () => {
  const mockUseAuthStore = useAuthStore as unknown as jest.Mock;
  const mockUseProductDeleteMutate = useProductDeleteMutate as jest.Mock;
  const mockToastWarn = toast.warn as jest.Mock;

  const mockMutate = jest.fn();
  const mockConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    global.confirm = mockConfirm;

    mockUseProductDeleteMutate.mockReturnValue({
      productDeleteMutate: mockMutate,
      productDeleteLoading: false
    });

    mockUseAuthStore.mockImplementation((selector) =>
      selector({ user: { uid: "123" } })
    );
  });

  it("상품 상태가 'trading'이면 toast.warn이 호출됩니다.", () => {
    const { result } = renderHook(() =>
      useProductDetailDeleteHandler({ productStatus: ProductStatus.trading })
    );

    act(() => {
      result.current.handleClickDelete();
    });

    expect(mockToastWarn).toHaveBeenCalledWith(
      "거래중인 상품은 삭제할 수 없어요."
    );
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("상품 상태가 'soldout'이면 toast.warn이 호출됩니다.", () => {
    const { result } = renderHook(() =>
      useProductDetailDeleteHandler({ productStatus: ProductStatus.soldout })
    );

    act(() => {
      result.current.handleClickDelete();
    });

    expect(mockToastWarn).toHaveBeenCalledWith(
      "판매된 상품은 삭제할 수 없어요."
    );
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("로그인하지 않은 경우 toast.warn이 호출됩니다.", () => {
    mockUseAuthStore.mockImplementation((selector) => selector({ user: null }));

    const { result } = renderHook(() =>
      useProductDetailDeleteHandler({ productStatus: ProductStatus.sold })
    );

    act(() => {
      result.current.handleClickDelete();
    });

    expect(mockToastWarn).toHaveBeenCalledWith("로그인 후 이용해주세요.");
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("confirm이 false면 mutate가 호출되지 않습니다.", () => {
    mockConfirm.mockReturnValue(false);

    const { result } = renderHook(() =>
      useProductDetailDeleteHandler({ productStatus: ProductStatus.sold })
    );

    act(() => {
      result.current.handleClickDelete();
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("모든 조건 만족하고, confirm이 ture면 mutate가 호출됩니다.", () => {
    mockConfirm.mockReturnValue(true);

    const { result } = renderHook(() =>
      useProductDetailDeleteHandler({ productStatus: ProductStatus.sold })
    );

    act(() => {
      result.current.handleClickDelete();
    });

    expect(mockMutate).toHaveBeenCalled();
  });
});
