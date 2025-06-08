import { renderHook } from "@testing-library/react";
import useChatOpponentProfile from "../../../hooks/useChatOpponentProfile";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import useProfileQuery from "@/domains/user/profile/hooks/queries/useProfileQuery";
import { ProfileData } from "@/domains/user/profile/types/profileTypes";

jest.mock("@/domains/auth/shared/common/store/authStore");
jest.mock("@/domains/user/profile/hooks/queries/useProfileQuery");

describe("useChatOpponentProfile 훅 테스트", () => {
  const mockUseAuthStore = useAuthStore as unknown as jest.Mock;
  const mockUseProfileQuery = useProfileQuery as jest.Mock;
  const mockMyUid = "user123";
  const mockOpponentUid = "opponent123";
  const mockMyProfile = {
    uid: mockMyUid,
    email: "me@example.com",
    nickname: "me"
  } as ProfileData;
  const mockOpponentProfileData = {
    uid: mockOpponentUid,
    email: "other@example.com",
    nickname: "other"
  } as ProfileData;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAuthStore.mockImplementation((selector) =>
      selector({ user: { uid: mockMyUid } })
    );

    mockUseProfileQuery.mockReturnValue({
      profileData: mockOpponentProfileData
    });
  });

  it("isMe 함수는 myUid와 myProfileData.uid 같으면 true를 반환합니다.", () => {
    const { result } = renderHook(() =>
      useChatOpponentProfile({
        participantIDs: [mockOpponentUid, mockMyUid],
        myProfileData: {
          uid: mockMyUid,
          nickname: "me",
          profileImg: "me@example.com"
        } as ProfileData
      })
    );

    expect(result.current.isMe(mockMyUid)).toBe(true);
    expect(result.current.isMe(mockOpponentUid)).toBe(false);
  });

  it("otherUserId 함수는 participantIDs에서 myUid가 아닌 id를 필터링합니다.", () => {
    const { result } = renderHook(() =>
      useChatOpponentProfile({
        participantIDs: [mockOpponentUid, mockMyUid],
        myProfileData: {
          uid: mockMyUid,
          nickname: "me",
          profileImg: "me@example.com"
        } as ProfileData
      })
    );
    expect(result.current.otherUserId).toBe(mockOpponentUid);
  });

  it("otherUserId를 호출하고 그 결과를 전달하여 useProfileQuery를 호출하여 otherUserProfileData를 반환합니다.", () => {
    const { result } = renderHook(() =>
      useChatOpponentProfile({
        participantIDs: [mockMyUid, mockOpponentUid],
        myProfileData: mockMyProfile
      })
    );

    expect(result.current.otherUserId).toBe(mockOpponentUid);
    expect(result.current.otherUserProfileData).toEqual(
      mockOpponentProfileData
    );
    expect(mockUseProfileQuery).toHaveBeenCalledWith(mockOpponentUid);
  });
});
