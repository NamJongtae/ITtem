import getMyProfile from "../../../api/getMyProfile";
import { customFetch } from "@/shared/common/utils/customFetch";
import { ProfileResponseData } from "../../../types/responseTypes";
import { ProfileData } from "../../../types/profileTypes";

jest.mock("@/shared/common/utils/customFetch", () => ({
  customFetch: jest.fn()
}));

describe("getMyProfile API 함수 테스트", () => {
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

  it("GET 요청을 보내고 응답 데이터를 그대로 반환합니다.", async () => {
    // ✅ customFetch는 data를 resolve
    (customFetch as jest.Mock).mockResolvedValue(mockResponseData);

    const result = await getMyProfile();

    expect(customFetch).toHaveBeenCalledWith("/api/profile");
    expect(result).toEqual(mockResponseData);
  });

  it("customFetch가 에러를 throw하면 동일한 에러를 전파합니다.", async () => {
    const fetchError = {
      status: 500,
      message: "프로필 데이터 조회에 실패했어요."
    };

    // ✅ 실패 시 reject
    (customFetch as jest.Mock).mockRejectedValue(fetchError);

    await expect(getMyProfile()).rejects.toEqual(fetchError);
  });
});
