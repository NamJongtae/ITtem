import { renderHook, act, waitFor } from "@testing-library/react";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useAddWishMutate from "@/domains/product/detail/hooks/mutations/useAddWishMutate";
import addProductWish from "@/domains/product/detail/api/addProductWish";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { useParams } from "next/navigation";

jest.mock("next/navigation");
jest.mock("@/domains/auth/shared/common/store/authStore");
jest.mock("@/domains/product/detail/api/addProductWish");

describe("useAddWishMutate 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();
  const mockAddWish = addProductWish as jest.Mock;
  const mockUseAuthStore = useAuthStore as unknown as jest.Mock;
  const productKey = queryKeys.product.detail("123").queryKey;
  const myProfileKey = queryKeys.profile.my.queryKey;
  const mockUseParams = useParams as jest.Mock;

  const fakeProduct = {
    _id: "123",
    wishUserIds: [],
    wishCount: 0
  };

  const fakeMyProfile = {
    uid: "user123",
    wishProductIds: []
  };

  let invalidateSpy: unknown;

  beforeEach(() => {
    jest.clearAllMocks();

    queryClient.setQueryData(productKey, fakeProduct);
    queryClient.setQueryData(myProfileKey, fakeMyProfile);

    mockUseParams.mockReturnValue({ productId: "123" });
    mockUseAuthStore.mockImplementation((selector) =>
      selector({ user: { uid: "user123" } })
    );

    invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");
  });

  it("onMutate에서 product, myProfile 캐시 cancelQueries, setQueryData가 호출됩니다.", async () => {
    const cancelQueriesSpy = jest.spyOn(queryClient, "cancelQueries");
    const setQueryDataSpy = jest.spyOn(queryClient, "setQueryData");

    const { result } = renderHook(() => useAddWishMutate(), {
      wrapper
    });

    act(() => {
      result.current.addWishMutate();
    });

    await waitFor(() => {
      expect(cancelQueriesSpy).toHaveBeenCalledWith({ queryKey: productKey });
      expect(cancelQueriesSpy).toHaveBeenCalledWith({ queryKey: myProfileKey });

      expect(setQueryDataSpy).toHaveBeenCalledWith(productKey, {
        _id: "123",
        wishUserIds: ["user123"],
        wishCount: 1
      });

      expect(setQueryDataSpy).toHaveBeenCalledWith(myProfileKey, {
        uid: "user123",
        wishProductIds: ["123"]
      });
    });
  });

  it("mutate가 성공하면 product 캐시 invalidateQueries가 호출됩니다.", async () => {
    mockAddWish.mockResolvedValue({ data: { message: "찜 완료" } });

    const { result } = renderHook(() => useAddWishMutate(), {
      wrapper
    });

    act(() => {
      result.current.addWishMutate();
    });

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: productKey });
    });
  });

  it("onError 발생 시 이전 데이터로 rollback하고, product 캐시 invalidateQueries가 호출됩니다.", async () => {
    mockAddWish.mockRejectedValue({
      response: { data: { message: "찜 실패" } },
      isAxiosError: true
    });

    const { result } = renderHook(() => useAddWishMutate(), {
      wrapper
    });

    act(() => {
      result.current.addWishMutate();
    });

    await waitFor(() => {
      expect(queryClient.getQueryData(productKey)).toEqual(fakeProduct);
      expect(queryClient.getQueryData(myProfileKey)).toEqual(fakeMyProfile);
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: productKey
      });
    });
  });
});
