// getUserProfile.test.ts
import getUserProfile from "../../../api/getUserProfile";
import { customFetch } from "@/shared/common/utils/customFetch";
import type { ProfileResponseData } from "../../../types/responseTypes";

jest.mock("@/shared/common/utils/customFetch", () => ({
  __esModule: true,
  customFetch: jest.fn()
}));

const mockUid = "user-123";

describe("getUserProfile (customFetch)", () => {
  const mockCustomFetch = customFetch as unknown as jest.Mock;

  const mockResponse: ProfileResponseData = {
    profile: {
      uid: mockUid,
      email: "user@example.com",
      nickname: "user1",
      profileImg: "https://storage.com/profile.jpg"
    } as any,
    message: "유저 프로필 조회에 성공했어요."
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("uid를 전달하여 GET요청을 보내고 응답을 받습니다.", async () => {
    mockCustomFetch.mockResolvedValue(mockResponse);

    const result = await getUserProfile(mockUid);

    expect(mockCustomFetch).toHaveBeenCalledWith(`/api/profile/${mockUid}`, {
      next: { revalidate: 60, tags: [`profile-${mockUid}`] }
    });
    expect(result).toEqual(mockResponse);
  });

  it("요청 실패 시 예외를 그대로 throw 합니다.", async () => {
    const error = new Error(
      "유저 프로필 조회에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    mockCustomFetch.mockRejectedValue(error);

    await expect(getUserProfile(mockUid)).rejects.toThrow(
      "유저 프로필 조회에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
