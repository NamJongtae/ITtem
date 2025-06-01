/**
 * @jest-environment node
 */
import checkAuthorization from "../../../utils/checkAuthorization";
import { verifyToken } from "@/shared/common/utils/verifyToken";
import { verifyTokenByJose } from "@/shared/common/utils/verifyTokenByJose";
import getTokenFromRedis from "../../../api/getTokenFromRedis";
import { IronSessionType } from "../../../types/authTypes";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

// 모듈 전체를 mock
jest.mock("iron-session");
jest.mock("next/headers");
jest.mock("@/shared/common/utils/verifyToken");
jest.mock("@/shared/common/utils/verifyTokenByJose");
jest.mock("../../../api/getTokenFromRedis");

describe("checkAuthorization", () => {
  const mockSession: IronSessionType = {
    accessToken: "mockAccessToken",
    refreshToken: "mockRefreshToken",
    save: jest.fn(async () => {}),
    destroy: jest.fn(() => {}),
    updateConfig: jest.fn(() => {})
  };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_SECRET_ACCESS_TOKEN_KEY = "test_secret";

    (getIronSession as jest.Mock).mockResolvedValue(mockSession);
    (cookies as jest.Mock).mockReturnValue({});
  });

  it("유효한 토큰일 경우 성공적으로 인증됩니다.", async () => {
    (verifyToken as jest.Mock).mockResolvedValue({
      isValid: true,
      data: { user: { uid: "user123" } }
    });
    (getTokenFromRedis as jest.Mock).mockResolvedValue("mockAccessToken");

    const result = await checkAuthorization();

    expect(result).toEqual({
      isValid: true,
      auth: { uid: "user123" },
      message: "유효한 토큰이에요."
    });
  });

  it("Redis 토큰 불일치 시 인증이 실패합니다.", async () => {
    (verifyToken as jest.Mock).mockResolvedValue({
      isValid: true,
      data: { user: { uid: "user123" } }
    });
    (getTokenFromRedis as jest.Mock).mockResolvedValue("differentToken");

    const result = await checkAuthorization();

    expect(result).toEqual({
      isValid: false,
      message: "만료된 토큰이에요."
    });
  });

  it("토큰 유효성 검사 실패 시 인증이 실패합니다.", async () => {
    (verifyToken as jest.Mock).mockResolvedValue({ isValid: false });

    const result = await checkAuthorization();

    expect(result).toEqual({
      isValid: false,
      message: "만료된 토큰이에요."
    });
  });

  it("Edge 런타임일 경우 verifyTokenByJose 사용합니다.", async () => {
    process.env.NEXT_RUNTIME = "edge";
    (verifyTokenByJose as jest.Mock).mockResolvedValue({
      isValid: true,
      data: { user: { uid: "edgeUser" } }
    });
    (getTokenFromRedis as jest.Mock).mockResolvedValue("mockAccessToken");

    const result = await checkAuthorization();

    expect(result.isValid).toBe(true);
    expect(result.auth?.uid).toBe("edgeUser");

    delete process.env.NEXT_RUNTIME;
  });
});
