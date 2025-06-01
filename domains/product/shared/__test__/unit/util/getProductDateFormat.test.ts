import getProductDateFormat from "../../../utils/getProductDateFormat";

describe("getProductDateFormat 테스트", () => {
  const KST_OFFSET = 9 * 60 * 60 * 1000;

  // 현재 시스템 내 시간은 한국 KST 시간
  const now = Date.now() + KST_OFFSET;
  const baseTime = now;

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(now);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const getUTCISOString = (kstDiffMs: number) => {
    // 서버에서 전달되는 데이터는 UTC시간 → 9시간을 빼주어야함
    return new Date(baseTime - kstDiffMs - KST_OFFSET).toISOString();
  };

  it("방금 전 (60초 미만)", () => {
    const time = getUTCISOString(30 * 1000); // 30초 전
    expect(getProductDateFormat(time)).toBe("방금 전");
  });

  it("5분 전", () => {
    const time = getUTCISOString(5 * 60 * 1000); // 5분 전
    expect(getProductDateFormat(time)).toBe("5분 전");
  });

  it("2시간 전", () => {
    const time = getUTCISOString(2 * 60 * 60 * 1000); // 2시간 전
    expect(getProductDateFormat(time)).toBe("2시간 전");
  });

  it("3일 전", () => {
    const time = getUTCISOString(3 * 24 * 60 * 60 * 1000); // 3일 전
    expect(getProductDateFormat(time)).toBe("3일 전");
  });

  it("2주 전", () => {
    const time = getUTCISOString(14 * 24 * 60 * 60 * 1000); // 2주 전
    expect(getProductDateFormat(time)).toBe("2주 전");
  });

  it("한 달 이상 전", () => {
    const time = getUTCISOString(40 * 24 * 60 * 60 * 1000); // 40일 전
    const result = getProductDateFormat(time);
    expect(result).toMatch(/^\d{4}\. \d{2}\. \d{2}\.$/);
  });
});
