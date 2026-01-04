import getMyProfile from "../../../api/getMyProfile";
import { customFetch } from "@/shared/common/utils/customFetch";
import { ProfileResponseData } from "../../../types/responseTypes";
import { ProfileData } from "../../../types/profileTypes";

jest.mock("@/shared/common/utils/customFetch", () => ({
  customFetch: jest.fn()
}));

describe("getMyProfile", () => {
  const mockResponseData: ProfileResponseData = {
    profile: {
      uid: "user-1",
      email: "test@example.com",
      nickname: "user1",
      profileImg: "https://storage.com/profile/test.png"
    } as ProfileData,
    message: "프로필 조회에 성공했어요."
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET 요청을 보내고 응답 데이터를 반환합니다.", async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(mockResponseData)
    } as unknown as Response;

    (customFetch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getMyProfile();

    expect(customFetch).toHaveBeenCalledWith("/api/profile", true);
    expect(result).toEqual(mockResponseData);
  });

  it("응답이 ok가 아닐 경우 예외를 던집니다.", async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      json: jest.fn().mockResolvedValue({
        message: "프로필 데이터 조회에 실패했어요."
      })
    } as unknown as Response;

    (customFetch as jest.Mock).mockResolvedValue(mockResponse);

    await expect(getMyProfile()).rejects.toThrow(
      "프로필 데이터 조회에 실패했어요."
    );
  });
});
