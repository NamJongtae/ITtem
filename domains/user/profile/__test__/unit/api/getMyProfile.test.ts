import getMyProfile from "../../../api/getMyProfile";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ProfileResponseData } from "../../../types/responseTypes";
import { ProfileData } from "../../../types/profileTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("getMyProfile", () => {
  const mockResponse: AxiosResponse<ProfileResponseData> = {
    data: {
      profile: {
        uid: "user-1",
        email: "test@example.com",
        nickname: "user1",
        profileImg: "https://storage.com/profile/test.png"
      } as ProfileData,
      message: "프로필 조회에 성공했어요."
    },
    status: 200,
    statusText: "ok",
    headers: {},
    config: {
      headers: new AxiosHeaders()
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET 요청을 보내고 응답을 받습니다.", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getMyProfile();

    expect(customAxios).toHaveBeenCalledWith("/api/profile");
    expect(result).toEqual(mockResponse);
  });

  it("요청 실패 시 예외를 던집니다.", async () => {
    const error = new Error(
      "프로필 조회에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios as unknown as jest.Mock).mockRejectedValue(error);

    await expect(getMyProfile()).rejects.toThrow(
      "프로필 조회에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
