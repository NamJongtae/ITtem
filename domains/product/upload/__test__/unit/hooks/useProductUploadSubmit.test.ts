import { renderHook, act } from "@testing-library/react";
import useProductUploadSubmit from "../../../hooks/useProductUploadSubmit";
import useProductUploadMutate from "../../../hooks/mutations/useProductUploadMutate";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { toast } from "react-toastify";

jest.mock("../../../hooks/mutations/useProductUploadMutate");
jest.mock("@/domains/auth/shared/common/store/authStore");
jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

describe("useProductUploadSubmit 훅 테스트", () => {
  const mockMutate = jest.fn();
  const mockUser = { uid: "user-123" };

  beforeEach(() => {
    jest.clearAllMocks();

    (useProductUploadMutate as jest.Mock).mockReturnValue({
      productUploadMuate: mockMutate,
      productUploadLoading: false,
      productUploadError: null
    });

    (useAuthStore as unknown as jest.Mock).mockImplementation((cb) =>
      cb({ user: mockUser })
    );
  });

  const sampleValues = {
    name: "상품명",
    description: "상세설명",
    price: "12,000",
    location: "서울",
    sellType: "즉시판매",
    category: "전자제품",
    condition: "중고",
    returnPolicy: "불가",
    transaction: "직거래",
    deliveryFee: "무료"
  };

  it("onSubmit 호출 시 productData를 전달하여 productUploadMuate가 호출됩니다.", async () => {
    const { result } = renderHook(() => useProductUploadSubmit());

    await act(async () => {
      await result.current.onSubmit(sampleValues);
    });

    expect(mockMutate).toHaveBeenCalledWith({
      productData: {
        name: "상품명",
        description: "상세설명",
        uid: "user-123",
        imgData: [],
        price: 12000,
        location: "서울",
        sellType: "즉시판매",
        category: "전자제품",
        condition: "중고",
        returnPolicy: "불가",
        transaction: "직거래",
        deliveryFee: "무료"
      },
      values: sampleValues
    });
  });

  it("에러가 발생하면 toast.warn을 호출합니다.", async () => {
    (useProductUploadMutate as jest.Mock).mockReturnValue({
      productUploadMuate: () => {
        throw new Error("실패");
      },
      productUploadLoading: false,
      productUploadError: null
    });

    const { result } = renderHook(() => useProductUploadSubmit());

    await act(async () => {
      await result.current.onSubmit(sampleValues);
    });

    expect(toast.warn).toHaveBeenCalledWith(
      "상품 등록에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });

  it("에러가 존재하면 productUploadError에 에러 상태를 반환합니다.", () => {
    (useProductUploadMutate as jest.Mock).mockReturnValue({
      productUploadMuate: jest.fn(),
      productUploadLoading: true,
      productUploadError: "에러 있음"
    });

    const { result } = renderHook(() => useProductUploadSubmit());

    expect(result.current.productUploadLoading).toBe(true);
    expect(result.current.productUploadError).toBe("에러 있음");
  });
});
