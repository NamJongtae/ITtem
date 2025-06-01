/**
 * @jest-environment node
 */
import hashPassword from "../../../utils/hashPassoword";
import { hash } from "bcryptjs";

jest.mock("bcryptjs", () => ({
  hash: jest.fn()
}));

const mockHash = hash as jest.Mock;

describe("hashPassword 함수 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("비밀번호를 해싱하여 문자열을 반환합니다.", async () => {
    mockHash.mockResolvedValue("mockedHashedPassword");

    const result = await hashPassword("123456");
    expect(result).toBe("mockedHashedPassword");
    expect(mockHash).toHaveBeenCalledWith("123456", 12);
  });

  it("해싱 도중 에러가 발생하면 에러를 throw합니다.", async () => {
    mockHash.mockRejectedValue(new Error("해싱 실패"));

    await expect(hashPassword("123456")).rejects.toThrow("해싱 실패");
  });
});
