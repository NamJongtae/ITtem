import { renderHook, act } from "@testing-library/react";
import useFollowUserInProduct from "../../../hooks/useFollowUserInProduct";
import useProductDetailFollowMutate from "../../../hooks/mutations/useProductDetailFollowMutate";
import useProductDetailUnFollowMutate from "../../../hooks/mutations/useProductDetailUnFollowMutate";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { toast } from "react-toastify";
import { ProfileData } from "@/domains/user/profile/types/profileTypes";

jest.mock("../../../hooks/mutations/useProductDetailFollowMutate");
jest.mock("../../../hooks/mutations/useProductDetailUnFollowMutate");

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

jest.mock("@/domains/auth/shared/common/store/authStore", () => ({
  __esModule: true,
  default: jest.fn()
}));

describe("useFollowUserInProduct 훅 테스트", () => {
  const mockFollowMutate = jest.fn();
  const mockUnfollowMutate = jest.fn();

  const mockMyProfile: ProfileData = {
    uid: "myUid"
  } as ProfileData;

  const mockUseAuthStore = useAuthStore as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    // 기본: 로그인 상태
    mockUseAuthStore.mockImplementation((selector: any) =>
      selector({ user: { uid: "myUid" } })
    );

    (useProductDetailFollowMutate as jest.Mock).mockReturnValue({
      productDetailfollowMutate: mockFollowMutate
    });

    (useProductDetailUnFollowMutate as jest.Mock).mockReturnValue({
      productDetailUnfollowMutate: mockUnfollowMutate
    });
  });

  it("uid가 내 uid와 같으면 isMyProfile은 true가 됩니다.", () => {
    const { result } = renderHook(() =>
      useFollowUserInProduct({
        uid: "myUid",
        isFollow: false,
        myProfileData: mockMyProfile
      })
    );

    expect(result.current.isMyProfile).toBe(true);
  });

  it("uid가 내 uid와 다르면 isMyProfile은 false가 됩니다.", () => {
    const { result } = renderHook(() =>
      useFollowUserInProduct({
        uid: "otherUid",
        isFollow: false,
        myProfileData: mockMyProfile
      })
    );

    expect(result.current.isMyProfile).toBe(false);
  });

  it("미로그인(myUid 없음)일 때 followHandler는 toast.warn 후 mutate를 호출하지 않습니다.", () => {
    mockUseAuthStore.mockImplementation((selector: any) =>
      selector({ user: null })
    );

    const { result } = renderHook(() =>
      useFollowUserInProduct({
        uid: "targetUid",
        isFollow: false,
        myProfileData: mockMyProfile
      })
    );

    act(() => {
      result.current.followHandler();
    });

    expect(toast.warn).toHaveBeenCalledWith("로그인이 필요해요.");
    expect(mockFollowMutate).not.toHaveBeenCalled();
    expect(mockUnfollowMutate).not.toHaveBeenCalled();
  });

  it("isFollow가 false면 followHandler 호출 시 productDetailfollowMutate가 호출됩니다.", () => {
    const { result } = renderHook(() =>
      useFollowUserInProduct({
        uid: "targetUid",
        isFollow: false,
        myProfileData: mockMyProfile
      })
    );

    act(() => {
      result.current.followHandler();
    });

    expect(mockFollowMutate).toHaveBeenCalled();
    expect(mockUnfollowMutate).not.toHaveBeenCalled();
  });

  it("isFollow가 true면 followHandler 호출 시 productDetailUnfollowMutate가 호출됩니다.", () => {
    const { result } = renderHook(() =>
      useFollowUserInProduct({
        uid: "targetUid",
        isFollow: true,
        myProfileData: mockMyProfile
      })
    );

    act(() => {
      result.current.followHandler();
    });

    expect(mockUnfollowMutate).toHaveBeenCalled();
    expect(mockFollowMutate).not.toHaveBeenCalled();
  });

  it("isFollow가 undefined면 followHandler는 followMutate로 동작합니다.", () => {
    const { result } = renderHook(() =>
      useFollowUserInProduct({
        uid: "targetUid",
        isFollow: undefined,
        myProfileData: mockMyProfile
      })
    );

    act(() => {
      result.current.followHandler();
    });

    expect(mockFollowMutate).toHaveBeenCalled();
    expect(mockUnfollowMutate).not.toHaveBeenCalled();
  });
});
