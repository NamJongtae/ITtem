import { renderHook, act } from "@testing-library/react";
import useProfileEditMutate from "@/domains/user/profile-edit/hooks/mutations/useProfileEditMutate";
import { toast } from "react-toastify";
import editProfile from "@/domains/user/profile-edit/api/editProfile";
import prepareProfileEditData from "@/domains/user/profile-edit/utils/prepareProfileEditData";
import { ProfileData } from "@/domains/user/profile/types/profileTypes";
import { ProfileEditData } from "@/domains/user/profile-edit/types/profileEditTypes";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";

jest.mock("@/domains/user/profile-edit/api/editProfile", () => jest.fn());
jest.mock("@/domains/user/profile-edit/utils/prepareProfileEditData", () =>
  jest.fn()
);
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn()
  }
}));

describe("useProfileEditMutate 훅 테스트", () => {
  const authQueryKey = queryKeys.auth._def;
  const myProfileQueryKey = queryKeys.profile.my.queryKey;
  const mockEditProfile = editProfile as jest.Mock;
  const mockCloseModal = jest.fn();
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("mutation 실행 시 prepareProfileEditData, editProfile를 호출하고 editProfile 호출 결과를 반환합니다.", async () => {
    const mockResponse = {
      data: { message: "프로필 수정에 성공했어요." }
    };

    mockEditProfile.mockResolvedValue(mockResponse);
    const { result } = renderHook(() => useProfileEditMutate(mockCloseModal), {
      wrapper
    });

    const testPayload = {
      profileData: { uid: "user1", nickname: "user123" } as ProfileData,
      profileEditData: { nickname: "newNickname" } as ProfileEditData,
      values: { nickname: "newNickname" }
    };

    let response;
    await act(async () => {
      response = await result.current.profileEditMutate(testPayload);
    });

    expect(prepareProfileEditData).toHaveBeenCalledWith({
      profileData: testPayload.profileData,
      profileEditData: testPayload.profileEditData,
      values: testPayload.values
    });

    expect(editProfile).toHaveBeenCalledWith(testPayload.profileEditData);
    expect(response).toBe(mockResponse);
  });

  it("onSuccess에서 closeModal, toast.success 호출하고, authQuery, myProfileQuery 캐시 invalidateQueries를 호출합니다.", async () => {
    const mockResponse = {
      data: { message: "프로필 수정에 성공했어요." }
    };

    const invalidateQueriesSpy = jest.spyOn(queryClient, "invalidateQueries");

    mockEditProfile.mockResolvedValue(mockResponse);
    const { result } = renderHook(() => useProfileEditMutate(mockCloseModal), {
      wrapper
    });

    const testPayload = {
      profileData: { uid: "user1", nickname: "user123" } as ProfileData,
      profileEditData: { nickname: "newNickname" } as ProfileEditData,
      values: { nickname: "newNickname" }
    };

    await act(async () => {
      await result.current.profileEditMutate(testPayload);
    });

    expect(mockCloseModal).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("프로필 수정에 성공했어요.");
    expect(invalidateQueriesSpy).toHaveBeenCalledWith({
      queryKey: authQueryKey
    });
    expect(invalidateQueriesSpy).toHaveBeenCalledWith({
      queryKey: myProfileQueryKey
    });
  });
});
