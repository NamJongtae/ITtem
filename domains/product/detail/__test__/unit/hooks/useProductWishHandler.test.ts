import { renderHook, act } from "@testing-library/react";
import useProductWishHandler from "../../../hooks/useProductWishHandler";
import useAddWishMutate from "../../../hooks/mutations/useAddWishMutate";
import useDeleteWishMutate from "../../../hooks/mutations/useDeleteWishMutate";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

jest.mock("../../../hooks/mutations/useAddWishMutate");
jest.mock("../../../hooks/mutations/useDeleteWishMutate");

import { ProfileData } from "@/domains/user/profile/types/profileTypes";

const mockToastWarn = toast.warn as jest.Mock;
const mockUseAddWishMutate = useAddWishMutate as jest.Mock;
const mockUseDeleteWishMutate = useDeleteWishMutate as jest.Mock;

describe("useProductWishHandler", () => {
  const mockAddMutate = jest.fn();
  const mockDeleteMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAddWishMutate.mockReturnValue({
      addWishMutate: mockAddMutate,
      addWishPending: false
    });

    mockUseDeleteWishMutate.mockReturnValue({
      deleteWishMutate: mockDeleteMutate,
      deleteWishPending: false
    });
  });

  const mockProfile: ProfileData = {
    uid: "user123"
  } as ProfileData;

  it("로그인하지 않은 경우 toast.warn이 호출됩니다.", () => {
    const { result } = renderHook(() =>
      useProductWishHandler({
        isWish: false,
        myProfileData: undefined
      })
    );

    act(() => {
      result.current.handleClickWish();
    });

    expect(mockToastWarn).toHaveBeenCalledWith("로그인이 필요해요.");
    expect(mockAddMutate).not.toHaveBeenCalled();
    expect(mockDeleteMutate).not.toHaveBeenCalled();
  });

  it("isWish=true인 경우 deleteWishMutate가 호출됩니다.", () => {
    const { result } = renderHook(() =>
      useProductWishHandler({
        isWish: true,
        myProfileData: mockProfile
      })
    );

    act(() => {
      result.current.handleClickWish();
    });

    expect(mockDeleteMutate).toHaveBeenCalledTimes(1);
    expect(mockAddMutate).not.toHaveBeenCalled();
  });

  it("isWish=false인 경우 addWishMutate가 호출됩니다.", () => {
    const { result } = renderHook(() =>
      useProductWishHandler({
        isWish: false,
        myProfileData: mockProfile
      })
    );

    act(() => {
      result.current.handleClickWish();
    });

    expect(mockAddMutate).toHaveBeenCalledTimes(1);
    expect(mockDeleteMutate).not.toHaveBeenCalled();
  });

  it("isWish가 undefined인 경우(현재 구현상) addWishMutate가 호출됩니다.", () => {
    const { result } = renderHook(() =>
      useProductWishHandler({
        isWish: undefined,
        myProfileData: mockProfile
      })
    );

    act(() => {
      result.current.handleClickWish();
    });

    expect(mockAddMutate).toHaveBeenCalledTimes(1);
    expect(mockDeleteMutate).not.toHaveBeenCalled();
  });
});
