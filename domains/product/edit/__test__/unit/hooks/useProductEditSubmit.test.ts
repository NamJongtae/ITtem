import { renderHook, act } from "@testing-library/react";
import useProductEditSubmit from "@/domains/product/edit/hooks/useProductEditSubmit";
import useProductEditMutate from "@/domains/product/edit/hooks/mutations/useProductEditMutate";
import deleteProductImgs from "@/domains/product/shared/utils/deleteProductImgs";
import prepareProductEditData from "@/domains/product/edit/utils/prepareProductEditData";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";

jest.mock("@/domains/product/edit/hooks/mutations/useProductEditMutate");
jest.mock("@/domains/product/shared/utils/deleteProductImgs");
jest.mock("@/domains/product/edit/utils/prepareProductEditData");
jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));
jest.mock("next/navigation");

describe("useProductEditSubmit 훅 테스트", () => {
  const mockUseParams = useParams as jest.Mock;
  const mockProductEditMutate = jest.fn();
  const mockDeleteProductImgs = deleteProductImgs as jest.Mock;
  const mockPrepareProductEditData = prepareProductEditData as jest.Mock;
  const mockUseProductEditMutate = useProductEditMutate as jest.Mock;

  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();

  const productId = "test-product-id";
  const productKey = queryKeys.product.detail(productId).queryKey;

  const fakeProductData = {
    _id: productId,
    name: "기존상품",
    price: 1000,
    imgData: [],
    description: "기존 설명"
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseParams.mockReturnValue({ productId });
    mockUseProductEditMutate.mockReturnValue({
      productEditMutate: mockProductEditMutate
    });

    queryClient.setQueryData(productKey, fakeProductData);
  });

  it("onSubmit 실행 시 데이터 가공, 이미지 삭제, 상품 수정 API 순으로 함수가 호출됩니다.", async () => {
    const { result } = renderHook(() => useProductEditSubmit(), { wrapper });

    const values = {
      name: "수정상품",
      price: 2000
    };

    await act(async () => {
      await result.current.onSubmit(values);
    });

    expect(mockPrepareProductEditData).toHaveBeenCalled();
    expect(mockDeleteProductImgs).toHaveBeenCalled();
    expect(mockProductEditMutate).toHaveBeenCalled();
    expect(result.current.productEditLoading).toBe(false);
    expect(result.current.productEditError).toBe(false);
  });

  it("에러 발생 시 toast.warn이 호출되고 에러 상태가 true가 됩니다.", async () => {
    mockPrepareProductEditData.mockImplementation(() => {
      throw new Error("에러 발생!");
    });

    const { result } = renderHook(() => useProductEditSubmit(), { wrapper });

    await act(async () => {
      await result.current.onSubmit({});
    });

    expect(toast.warn).toHaveBeenCalledWith(
      "상품 수정에 실패했어요.\n 잠시후 다시 시도해주세요."
    );
    expect(result.current.productEditError).toBe(true);
    expect(result.current.productEditLoading).toBe(false);
  });
});
