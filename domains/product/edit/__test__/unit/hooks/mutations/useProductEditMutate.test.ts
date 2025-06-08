import { renderHook, act } from "@testing-library/react";
import useProductEditMutate from "@/domains/product/edit/hooks/mutations/useProductEditMutate";
import editProduct from "@/domains/product/edit/api/editProduct";
import { useParams, useRouter } from "next/navigation";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";

jest.mock("@/domains/product/edit/api/editProduct");
jest.mock("next/navigation");

describe("useProductEditMutate 훅 테스트", () => {
  const mockEditProduct = editProduct as jest.Mock;
  const mockUseParams = useParams as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;
  const mockRouterPush = jest.fn();

  const productId = "test-product-id";
  const fakeResponse = {
    data: {
      product: {
        _id: productId
      }
    }
  };

  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();
  const invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseParams.mockReturnValue({ productId });
    mockUseRouter.mockReturnValue({ push: mockRouterPush });
    mockEditProduct.mockResolvedValue(fakeResponse);
  });

  it("상품 수정 성공 시 editProduct, invalidateQueries, router.push, window.scrollTo가 호출됩니다.", async () => {
    const scrollSpy = jest
      .spyOn(window, "scrollTo")
      .mockImplementation(() => {});

    const { result } = renderHook(() => useProductEditMutate(), { wrapper });

    const updateData = {
      name: "수정상품",
      price: 5000
    };

    await act(async () => {
      await result.current.productEditMutate(updateData);
    });

    expect(mockEditProduct).toHaveBeenCalledWith(productId, updateData);
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: queryKeys.product.detail(productId).queryKey
    });
    expect(mockRouterPush).toHaveBeenCalledWith(`/product/${productId}`);
    expect(scrollSpy).toHaveBeenCalledWith(0, 0);
  });
});
