/**
 * @jest-environment node
 */
import { verifyTokenByJose } from "@/shared/common/utils/verifyTokenByJose";
import { JWTPayload, SignJWT } from "jose";

describe("verifyTokenByJose 함수 테스트", () => {
  const secret = "test-secret";
  const payload = {
    user: { uid: "user123" },
    lat: Date.now()
  };

  let validToken: string;

  const generateJoseToken = async ({
    payload,
    secret,
    expiresIn
  }: {
    payload: JWTPayload;
    secret: string;
    expiresIn: string;
  }): Promise<string> => {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(expiresIn)
      .sign(new TextEncoder().encode(secret));
  };

  beforeAll(async () => {
    validToken = await generateJoseToken({
      payload,
      secret,
      expiresIn: "1h"
    });
  });

  it("유효한 토큰은 isValid: true를 반환해야 합니다.", async () => {
    const result = await verifyTokenByJose(validToken, secret);

    expect(result).toEqual(
      expect.objectContaining({
        isValid: true,
        data: expect.objectContaining({
          user: { uid: "user123" }
        })
      })
    );
  });

  it("잘못된 토큰은 isValid: false를 반환해야 합니다.", async () => {
    const result = await verifyTokenByJose("invalid.token.value", secret);

    expect(result?.isValid).toBe(false);
    expect(result?.message).toBeDefined();
  });

  it("비밀키가 틀리면 isValid: false를 반환해야 합니다.", async () => {
    const result = await verifyTokenByJose(validToken, "wrong-secret");

    expect(result?.isValid).toBe(false);
    expect(result?.message?.toLowerCase()).toContain(
      "signature verification failed"
    );
  });

  it("만료된 토큰은 검증에 실패해야 합니다.", async () => {
    const shortToken = await generateJoseToken({
      payload,
      secret,
      expiresIn: "1s"
    });

    await new Promise((res) => setTimeout(res, 1500));

    const result = await verifyTokenByJose(shortToken, secret);

    expect(result?.isValid).toBe(false);
    expect(result?.message?.toLowerCase()).toContain("timestamp");
  });
});
