import { renderHook, act } from "@testing-library/react";
import useProductUploadMutate from "@/domains/product/upload/hooks/mutations/useProductUploadMutate";
import uploadMultiImgToFirestore from "@/domains/product/upload/utils/uploadMultiProductImgToFirestore";
import uploadProduct from "@/domains/product/upload/api/uploadProduct";
import { useRouter } from "next/navigation";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useGlobalLoadingStore from "@/shared/common/store/globalLogingStore";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import { ProductUploadData } from "@/domains/product/upload/types/productUploadTypes";

jest.mock("@/domains/product/upload/utils/uploadMultiProductImgToFirestore");
jest.mock("@/domains/product/upload/api/uploadProduct");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn()
}));
jest.mock("@/shared/common/store/globalLogingStore");

describe("useProductUploadMutate 훅 테스트", () => {
  const mockPush = jest.fn();
  const mockStartLoading = jest.fn();
  const mockStopLoading = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;
  const mockUseGlobalLoadingStore =
    useGlobalLoadingStore as unknown as jest.Mock;
  const mcokUploadMultiImgToFirestore = uploadMultiImgToFirestore as jest.Mock;
  const mockUploadProduct = uploadProduct as jest.Mock;
  const myProfileQuerykey = queryKeys.profile.my._ctx.products._def;
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseRouter.mockReturnValue({ push: mockPush });
    mockUseGlobalLoadingStore.mockReturnValue({
      actions: {
        startLoading: mockStartLoading,
        stopLoading: mockStopLoading
      }
    });

    global.scrollTo = jest.fn();
  });

  it("onMutate에서 startLoading이 호출됩니다.", async () => {
    const { result } = renderHook(() => useProductUploadMutate(), { wrapper });

    mockUploadProduct.mockResolvedValue({
      data: {
        product: {
          _id: "123"
        }
      }
    });

    await act(async () => {
      await result.current.productUploadMuate({
        productData: {
          name: "상품",
          description: "설명"
        } as ProductUploadData,
        values: {
          imgData: []
        }
      });
    });

    expect(mockStartLoading).toHaveBeenCalled();
  });

  it("onSuccess시 invalidateQueries, router.push, window.scrollTo, stopLoading가 호출됩니다.", async () => {
    mcokUploadMultiImgToFirestore.mockResolvedValue([{ url: "test-url" }]);
    mockUploadProduct.mockResolvedValue({
      data: {
        product: {
          _id: "123"
        }
      }
    });

    const invalidateQueriesSpy = jest.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useProductUploadMutate(), { wrapper });

    await act(async () => {
      await result.current.productUploadMuate({
        productData: {
          name: "상품",
          description: "설명"
        } as ProductUploadData,
        values: {
          imgData: ["file1", "file2"]
        }
      });
    });

    expect(mockStartLoading).toHaveBeenCalled();
    expect(uploadMultiImgToFirestore).toHaveBeenCalledWith(["file1", "file2"]);
    expect(uploadProduct).toHaveBeenCalledWith({
      name: "상품",
      description: "설명",
      imgData: [{ url: "test-url" }]
    });
    expect(invalidateQueriesSpy).toHaveBeenCalledWith({
      queryKey: myProfileQuerykey
    });
    expect(mockPush).toHaveBeenCalledWith("/product/123");
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(mockStopLoading).toHaveBeenCalled();
  });

  it("에러 발생시 stopLoadin을 호출하고, productUploadError에 에러를 반환합니다. ", async () => {
    (uploadMultiImgToFirestore as jest.Mock).mockRejectedValue(
      new Error("업로드 실패")
    );

    const { result } = renderHook(() => useProductUploadMutate(), { wrapper });

    await act(async () => {
      await expect(
        result.current.productUploadMuate({
          productData: { name: "상품" } as ProductUploadData,
          values: { imgData: [] }
        })
      ).rejects.toThrow("업로드 실패");
    });

    expect(mockStartLoading).toHaveBeenCalled();
    expect(mockStopLoading).toHaveBeenCalled();
  });
});
