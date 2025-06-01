import createAndSaveToken from "../../../utils/createAndSaveToken";
import { generateToken } from "@/shared/common/utils/generateToken";
import saveTokenFromRedis from "../../../api/saveTokenFromRedis";
import {
  ACCESS_TOKEN_EXP,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_EXP
} from "../../../constants/constansts";

// Mocks
jest.mock("@/shared/common/utils/generateToken");
jest.mock("../../../api/saveTokenFromRedis");

describe("createAndSaveToken 함수 테스트", () => {
  const MOCK_DATE = Date.now();

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(MOCK_DATE);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("토큰을 생성하고, Redis에 저장한 뒤, 세션에 저장합니다.", async () => {
    const mockAccessToken = "mockedAccessToken";
    const mockRefreshToken = "mockedRefreshToken";

    (generateToken as jest.Mock).mockImplementation(({ secret }) => {
      return secret === ACCESS_TOKEN_KEY ? mockAccessToken : mockRefreshToken;
    });

    const sessionMock = {
      accessToken: "",
      refreshToken: "",
      save: jest.fn()
    };

    const user = { uid: "testUser123" };

    await createAndSaveToken({ user, session: sessionMock as any });

    // generateToken 호출 확인
    expect(generateToken).toHaveBeenCalledTimes(2);

    // Redis 저장 확인
    expect(saveTokenFromRedis).toHaveBeenCalledWith({
      uid: user.uid,
      token: mockAccessToken,
      type: "accessToken",
      exp: Math.floor(MOCK_DATE / 1000) + ACCESS_TOKEN_EXP
    });
    expect(saveTokenFromRedis).toHaveBeenCalledWith({
      uid: user.uid,
      token: mockRefreshToken,
      type: "refreshToken",
      exp: Math.floor(MOCK_DATE / 1000) + REFRESH_TOKEN_EXP
    });

    // 세션 저장 확인
    expect(sessionMock.accessToken).toBe(mockAccessToken);
    expect(sessionMock.refreshToken).toBe(mockRefreshToken);
    expect(sessionMock.save).toHaveBeenCalled();
  });
});
