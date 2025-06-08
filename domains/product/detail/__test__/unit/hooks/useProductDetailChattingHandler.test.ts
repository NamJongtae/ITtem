import { renderHook, act } from "@testing-library/react";
import useProductDetailChattingHandler from "../../../hooks/useProductDetailChattingHandler";
import useStartChatMutate from "@/domains/chat/room-list/hooks/mutations/useStartChatMutate";
import { toast } from "react-toastify";

// ✅ 모킹
jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

jest.mock("@/domains/chat/room-list/hooks/mutations/useStartChatMutate");
jest.mock("@/domains/auth/shared/common/store/authStore", () => ({
  __esModule: true,
  default: jest.fn()
}));

const mockMutate = jest.fn();
const mockToastWarn = toast.warn as jest.Mock;
const mockUseStartChatMutate = useStartChatMutate as jest.Mock;

import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { ProductStatus } from "@/domains/product/shared/types/productTypes";
const mockUseAuthStore = useAuthStore as unknown as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
  mockUseStartChatMutate.mockReturnValue({ mutate: mockMutate });
  mockUseAuthStore.mockImplementation((selector) =>
    selector({ user: { uid: "123" } })
  );
});

describe("useProductDetailChattingHandler", () => {
  it("상품 상태가 'trading'이면 toast.warn 호출합니다.", () => {
    const { result } = renderHook(() =>
      useProductDetailChattingHandler({
        productStatus: ProductStatus.trading,
        productId: "p1",
        productUserId: "u1"
      })
    );

    act(() => {
      result.current.handleClickChatting();
    });

    expect(mockToastWarn).toHaveBeenCalledWith("현재 거래중인 상품이에요.");
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("상품 상태가 'soldout'이면 경고 toast.warn를 호출합니다.", () => {
    const { result } = renderHook(() =>
      useProductDetailChattingHandler({
        productStatus: ProductStatus.soldout,
        productId: "p1",
        productUserId: "u1"
      })
    );

    act(() => {
      result.current.handleClickChatting();
    });

    expect(mockToastWarn).toHaveBeenCalledWith("이미 판매된 상품이에요.");
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("로그인하지 않은 경우 toast.warn를 호출합니다.", () => {
    mockUseAuthStore.mockImplementation((selector) => selector({ user: null }));

    const { result } = renderHook(() =>
      useProductDetailChattingHandler({
        productStatus: ProductStatus.sold,
        productId: "p1",
        productUserId: "u1"
      })
    );

    act(() => {
      result.current.handleClickChatting();
    });

    expect(mockToastWarn).toHaveBeenCalledWith("로그인 후 이용해주세요.");
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("productId 또는 productUserId가 없으면 mutate가 호출되지 않습니다.", () => {
    mockUseAuthStore.mockReturnValue({ user: { uid: "123" } });

    const { result } = renderHook(() =>
      useProductDetailChattingHandler({
        productStatus: ProductStatus.sold,
        productId: undefined,
        productUserId: undefined
      })
    );

    act(() => {
      result.current.handleClickChatting();
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("모든 조건이 충족되면 mutate를 호출합니다.", () => {
    const { result } = renderHook(() =>
      useProductDetailChattingHandler({
        productStatus: ProductStatus.sold,
        productId: "p1",
        productUserId: "u1"
      })
    );

    act(() => {
      result.current.handleClickChatting();
    });

    expect(mockMutate).toHaveBeenCalledWith({ productId: "p1", userId: "u1" });
    expect(mockToastWarn).not.toHaveBeenCalled();
  });
});
