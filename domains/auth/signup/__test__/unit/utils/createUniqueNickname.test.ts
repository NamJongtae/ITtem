import createUniqueNickname from "../../../utils/createUniqueNickname";
import { v4 as uuid } from "uuid";
import { Model } from "mongoose";
import { UserDB } from "@/domains/auth/shared/common/models/User";

// uuid 모듈을 mock 처리
jest.mock("uuid", () => ({
  v4: jest.fn()
}));

describe("createUniqueNickname 함수 테스트", () => {
  const mockUuid = "abcd1234-5678-90ab-cdef-1234567890ab";
  const mockRandomString = mockUuid.substring(0, 8); // 'abcd1234'

  // User 모델을 mock 객체로 생성
  const User = {
    findOne: jest.fn()
  } as unknown as Model<UserDB>;

  beforeEach(() => {
    jest.clearAllMocks();
    (uuid as jest.Mock).mockReturnValue(mockUuid);
  });

  it("닉네임이 중복되지 않으면 첫 시도에 반환합니다.", async () => {
    // 닉네임이 DB에 존재하지 않도록 설정
    (User.findOne as jest.Mock).mockResolvedValue(null);

    const nickname = await createUniqueNickname(User);

    expect(nickname).toBe(mockRandomString);
    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(User.findOne).toHaveBeenCalledWith({ nickname: mockRandomString });
  });

  it("닉네임이 중복되면 중복되지 않을 때까지 재시도합니다.", async () => {
    // 첫 시도는 중복, 두 번째 시도는 성공하도록 설정
    (User.findOne as jest.Mock)
      .mockResolvedValueOnce({ nickname: mockRandomString }) // 중복 발생
      .mockResolvedValueOnce(null); // 중복 없음

    const nickname = await createUniqueNickname(User);

    expect(nickname).toBe(mockRandomString);
    expect(User.findOne).toHaveBeenCalledTimes(2);
    expect(User.findOne).toHaveBeenCalledWith({ nickname: mockRandomString });
  });
});
