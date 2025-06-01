import { generateToken } from "@/shared/common/utils/generateToken";
import jwt from "jsonwebtoken";

describe("generateToken 함수 테스트", () => {
  const secret = "test-secret";
  const payload = { userId: 1, role: "admin" };

  it("토큰을 정상적으로 생성해야 한다", async () => {
    const token = await generateToken({ payload, secret });
    expect(typeof token).toBe("string");

    // 생성된 토큰이 유효한지 검증
    const decoded = jwt.verify(token!, secret);
    expect(decoded).toMatchObject(payload);
  });

  it("옵션을 포함하여 토큰 생성이 가능해야 한다", async () => {
    const options = { expiresIn: "1h" };
    const token = await generateToken({ payload, secret, options });
    const decoded = jwt.verify(token!, secret) as jwt.JwtPayload;

    expect(decoded).toHaveProperty("exp");
  });

  it("비밀키가 없으면 에러를 던져야 한다", async () => {
    await expect(generateToken({ payload, secret: "" })).rejects.toThrow(
      "Failed to generate token"
    );
  });
});
