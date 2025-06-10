import getUser from "../../../api/getUser";
import customAxios from "@/shared/common/utils/customAxios";
import { AuthData } from "@/domains/auth/shared/common/types/authTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("getUser API 함수 테스트", () => {
  const mockUser: AuthData = {
    uid: "user-123",
    email: "user@example.com",
    nickname: "tester",
    profileImg: "https://storage.com/user.png"
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET 요청을 보내면 유저 정보 데이터를 반환합니다.", async () => {
    (customAxios.get as jest.Mock).mockResolvedValue({
      data: { user: mockUser }
    });

    const result = await getUser();

    expect(customAxios.get).toHaveBeenCalledWith("/api/auth/user");
    expect(result).toEqual(mockUser);
  });

  it("요청 실패 시 예외를 던집니다.", async () => {
    const error = new Error(
      "유저 인증에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios.get as jest.Mock).mockRejectedValue(error);

    await expect(getUser()).rejects.toThrow(
      "유저 인증에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
