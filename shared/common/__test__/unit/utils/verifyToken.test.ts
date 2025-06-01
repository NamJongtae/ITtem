import { verifyToken } from "@/shared/common/utils/verifyToken";
import { generateToken } from "@/shared/common/utils/generateToken";

describe("verifyToken 함수 테스트", () => {
  const secret = "test-secret";
  const payload = {
    user: { uid: "user123" }
  };

  let validToken: string;

  beforeAll(async () => {
    // 토큰을 미리 생성
    validToken = (await generateToken({
      payload: { ...payload },
      secret,
      options: { expiresIn: "1h" }
    })) as string;
  });

  it("유효한 토큰은 isValid: true를 반환해야 합니다.", async () => {
    const result = await verifyToken(validToken, secret);

    expect(result).toEqual(
      expect.objectContaining({
        isValid: true,
        message: "Valid Token.",
        data: expect.objectContaining({
          user: { uid: "user123" }
        })
      })
    );
  });

  it("잘못된 토큰은 isValid: false를 반환해야 합니다.", async () => {
    const result = await verifyToken("invalid.token.value", secret);

    expect(result?.isValid).toBe(false);
    expect(result?.message).toBeDefined();
  });

  it("비밀키가 틀리면 isValid: false를 반환해야 합니다.", async () => {
    const result = await verifyToken(validToken, "wrong-secret");

    expect(result?.isValid).toBe(false);
    expect(result?.message).toContain("invalid signature");
  });

  it("만료된 토큰은 검증에 실패해야 합니다.", async () => {
    // expiresIn: 1초짜리 토큰 생성 후 지연
    const shortLivedToken = (await generateToken({
      payload,
      secret,
      options: { expiresIn: "1s" }
    })) as string;

    await new Promise((res) => setTimeout(res, 1500)); // 1.5초 대기

    const result = await verifyToken(shortLivedToken, secret);
    expect(result?.isValid).toBe(false);
    expect(result?.message?.toLowerCase()).toContain("jwt expired");
  });
});
