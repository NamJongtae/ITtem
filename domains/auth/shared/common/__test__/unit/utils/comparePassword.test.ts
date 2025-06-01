/**
 * @jest-environment node
 */
import comparePassword from "../../../utils/comparePassword";
import { compare } from "bcryptjs";

// bcryptjs의 compare 함수를 mock
jest.mock("bcryptjs", () => ({
  compare: jest.fn()
}));

describe("comparePassword 함수 테스트", () => {
  const mockCompare = compare as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("비밀번호가 일치할 경우 true를 반환합니다.", async () => {
    mockCompare.mockResolvedValue(true);

    const result = await comparePassword("123456", "hashed123");
    expect(result).toBe(true);
    expect(mockCompare).toHaveBeenCalledWith("123456", "hashed123");
  });

  it("비밀번호가 일치하지 않을 경우 false를 반환합니다.", async () => {
    mockCompare.mockResolvedValue(false);

    const result = await comparePassword("wrongPass", "hashed123");
    expect(result).toBe(false);
    expect(mockCompare).toHaveBeenCalledWith("wrongPass", "hashed123");
  });

  it("에러 발생 시 에러를 throw합니다.", async () => {
    mockCompare.mockRejectedValue(new Error("비교 실패"));

    await expect(comparePassword("123456", "hashed123")).rejects.toThrow(
      "비교 실패"
    );
  });
});
