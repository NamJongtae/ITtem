/**
 * @jest-environment node
 */
import checkAuthorization from "../../../utils/checkAuthorization";
import dbConnect from "@/shared/common/utils/db/db";
import Session from "@/domains/auth/shared/common/models/Sessions";
import User from "@/domains/auth/shared/common/models/User";
import { cookies } from "next/headers";

jest.mock("@/shared/common/utils/db/db");
jest.mock("@/domains/auth/shared/common/models/Sessions");
jest.mock("@/domains/auth/shared/common/models/User");
jest.mock("next/headers");

describe("checkAuthorization (session cookie + mongo)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("sessionId 쿠키가 없으면 로그인이 필요해요를 반환한다.", async () => {
    // cookies()가 Promise를 반환하도록 mock (await cookies() 대응)
    (cookies as unknown as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue(undefined)
    });

    const result = await checkAuthorization();

    expect(result).toEqual({
      isValid: false,
      message: "로그인이 필요해요."
    });

    expect(dbConnect).not.toHaveBeenCalled();
    expect((Session as any).findOne).not.toHaveBeenCalled();
    expect((User as any).findById).not.toHaveBeenCalled();
  });

  it("세션이 없거나 만료되면 만료된 세션이에요를 반환한다.", async () => {
    (cookies as unknown as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: "session123" })
    });

    (dbConnect as unknown as jest.Mock).mockResolvedValue(undefined);
    (Session as any).findOne = jest.fn().mockResolvedValue(null);

    const result = await checkAuthorization();

    expect(dbConnect).toHaveBeenCalled();
    expect((Session as any).findOne).toHaveBeenCalledWith({
      sessionId: "session123",
      expiresAt: { $gt: expect.any(Date) }
    });

    expect(result).toEqual({
      isValid: false,
      message: "만료된 세션이에요."
    });

    expect((User as any).findById).not.toHaveBeenCalled();
  });

  it("세션은 있는데 유저가 없으면 유효하지 않은 사용자예요를 반환한다.", async () => {
    (cookies as unknown as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: "session123" })
    });

    (dbConnect as unknown as jest.Mock).mockResolvedValue(undefined);

    // session.uid를 사용하므로 uid가 있어야 함
    (Session as any).findOne = jest.fn().mockResolvedValue({
      uid: "userObjectId123"
    });

    // User.findById().select(...) 체이닝 mock
    const selectMock = jest.fn().mockResolvedValue(null);
    (User as any).findById = jest.fn().mockReturnValue({
      select: selectMock
    });

    const result = await checkAuthorization();

    expect((User as any).findById).toHaveBeenCalledWith("userObjectId123");
    expect(selectMock).toHaveBeenCalledWith("_id email nickname profileImg");

    expect(result).toEqual({
      isValid: false,
      message: "유효하지 않은 사용자예요."
    });
  });

  it("유효한 세션 + 유효한 유저면 auth 정보를 포함해 성공을 반환한다.", async () => {
    (cookies as unknown as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: "session123" })
    });

    (dbConnect as unknown as jest.Mock).mockResolvedValue(undefined);

    (Session as any).findOne = jest.fn().mockResolvedValue({
      uid: "userObjectId123"
    });

    const mockUser = {
      _id: "userObjectId123",
      email: "test@example.com",
      nickname: "테스터",
      profileImg: "https://example.com/p.png"
    };

    const selectMock = jest.fn().mockResolvedValue(mockUser);
    (User as any).findById = jest.fn().mockReturnValue({
      select: selectMock
    });

    const result = await checkAuthorization();

    expect(result).toEqual({
      isValid: true,
      auth: {
        uid: "userObjectId123",
        email: "test@example.com",
        nickname: "테스터",
        profileImg: "https://example.com/p.png"
      },
      message: "유효한 세션이에요."
    });
  });

  it("예외가 발생하면 인증 확인 중 오류가 발생했어요를 반환한다.", async () => {
    (cookies as unknown as jest.Mock).mockRejectedValue(new Error("boom"));

    const result = await checkAuthorization();

    expect(result).toEqual({
      isValid: false,
      message: "인증 확인 중 오류가 발생했어요."
    });
  });
});
