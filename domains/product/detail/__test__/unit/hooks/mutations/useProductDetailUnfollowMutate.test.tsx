import { renderHook, act, waitFor } from "@testing-library/react";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useProductDetailUnfollowMutate from "@/domains/product/detail/hooks/mutations/useProductDetailUnfollowMutate";
import unfollowUser from "@/domains/user/shared/api/unfollowUser";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));
jest.mock("next/navigation");
jest.mock("@/domains/auth/shared/common/store/authStore");
jest.mock("@/domains/user/shared/api/unfollowUser");

describe("useProductDetailUnfollowMutate 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();
  const mockUnfollowUser = unfollowUser as jest.Mock;
  const mockUseAuthStore = useAuthStore as unknown as jest.Mock;
  const mockUseParams = useParams as jest.Mock;

  const productKey = queryKeys.product.detail("123").queryKey;
  const myProfileKey = queryKeys.profile.my.queryKey;

  const fakeProduct = {
    _id: "123",
    auth: {
      followers: ["user123"]
    }
  };

  const fakeMyProfile = {
    uid: "user123",
    followings: ["targetUser123"]
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

  it("onMutate에서 product, myProfile 캐시 cancelQueries, setQueryData호출됩니다.", async () => {
    const cancelQueriesSpy = jest.spyOn(queryClient, "cancelQueries");
    const setQueryDataSpy = jest.spyOn(queryClient, "setQueryData");

    const { result } = renderHook(
      () => useProductDetailUnfollowMutate("targetUser123"),
      {
        wrapper
      }
    );

    act(() => {
      result.current.productDetailUnfollowMutate();
    });

    await waitFor(() => {
      expect(cancelQueriesSpy).toHaveBeenCalledWith({ queryKey: productKey });
      expect(cancelQueriesSpy).toHaveBeenCalledWith({ queryKey: myProfileKey });
      expect(setQueryDataSpy).toHaveBeenCalledWith(productKey, {
        ...fakeProduct,
        auth: {
          ...fakeProduct.auth,
          followers: []
        }
      });
      expect(setQueryDataSpy).toHaveBeenCalledWith(myProfileKey, {
        uid: "user123",
        followings: []
      });
    });
  });

  it("mutate가 성공하면 product, myProfile 캐시 invalidateQueries가 호출됩니다.", async () => {
    mockUnfollowUser.mockResolvedValue({ data: { message: "언팔로우 성공" } });

    const { result } = renderHook(
      () => useProductDetailUnfollowMutate("targetUser123"),
      {
        wrapper
      }
    );

    act(() => {
      result.current.productDetailUnfollowMutate();
    });

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: productKey });
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: myProfileKey });
    });
  });

  it("onError 발생 시 이전 데이터로 rollback되고 product, myProfile 캐시 invalidateQueries가 호출됩니다.", async () => {
    mockUnfollowUser.mockRejectedValue({
      response: { data: { message: "서버 오류" } },
      isAxiosError: true
    });

    const { result } = renderHook(
      () => useProductDetailUnfollowMutate("targetUser123"),
      {
        wrapper
      }
    );

    act(() => {
      result.current.productDetailUnfollowMutate();
    });

    await waitFor(() => {
      expect(queryClient.getQueryData(productKey)).toEqual(fakeProduct);
      expect(queryClient.getQueryData(myProfileKey)).toEqual(fakeMyProfile);
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: productKey });
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: myProfileKey });
      expect(toast.warn).toHaveBeenCalledWith(
        "유저 언팔로우에 실패했어요.\n잠시 후에 다시 시도해주세요."
      );
    });
  });
});
