import { renderHook, act } from "@testing-library/react";
import useProductDetailEditHandler from "../../../hooks/useProductDetailEditHandler";
import { toast } from "react-toastify";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { ProductStatus } from "@/domains/product/shared/types/productTypes";
import { useRouter, useParams } from "next/navigation";

jest.mock("next/navigation");

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

jest.mock("@/domains/auth/shared/common/store/authStore");

describe("useProductDetailEditHandler 훅 테스트", () => {
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;
  const mockUseParams = useParams as jest.Mock;
  const mockUseAuthStore = useAuthStore as unknown as jest.Mock;
  const mockToastWarn = toast.warn as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({ push: mockPush });
    mockUseParams.mockReturnValue({ productId: "p1" });
    mockUseAuthStore.mockImplementation((selector) =>
      selector({ user: { uid: "123" } })
    );
  });

  it("상품 상태가 'trading'이면 경고 toast.warn를 호출합니다.", () => {
    const { result } = renderHook(() =>
      useProductDetailEditHandler({ productStatus: ProductStatus.trading })
    );

    act(() => {
      result.current.handleClickEdit();
    });

    expect(mockToastWarn).toHaveBeenCalledWith(
      "거래중인 상품은 수정할 수 없어요."
    );
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("상품 상태가 'soldout'이면 toast.warn를 호출합니다.", () => {
    const { result } = renderHook(() =>
      useProductDetailEditHandler({ productStatus: ProductStatus.soldout })
    );

    act(() => {
      result.current.handleClickEdit();
    });

    expect(mockToastWarn).toHaveBeenCalledWith(
      "판매된 상품은 수정할 수 없어요."
    );
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("로그인하지 않은 경우 toast.warn를 호출합니다.", () => {
    mockUseAuthStore.mockImplementation((selector) => selector({ user: null }));

    const { result } = renderHook(() =>
      useProductDetailEditHandler({ productStatus: ProductStatus.sold })
    );

    act(() => {
      result.current.handleClickEdit();
    });

    expect(mockToastWarn).toHaveBeenCalledWith("로그인 후 이용해주세요.");
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("모든 조건이 만족되면 router.push가 호출됩니다.", () => {
    mockUseAuthStore.mockReturnValue({ user: { uid: "user1" } });

    const { result } = renderHook(() =>
      useProductDetailEditHandler({ productStatus: ProductStatus.sold })
    );

    act(() => {
      result.current.handleClickEdit();
    });

    expect(mockPush).toHaveBeenCalledWith("/product/p1/edit");
    expect(mockToastWarn).not.toHaveBeenCalled();
  });
});
