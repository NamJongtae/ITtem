import getChattingDateFormat from "../../../utils/getChattingDateFormat";

describe("getChattingDateFormat", () => {
  const fixedNow = new Date("2025-05-31T15:00:00Z");

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(fixedNow);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("오늘 날짜일 경우: 오전/오후 시간 포맷", () => {
    const date = new Date("2025-06-01T00:30:00Z");
    expect(getChattingDateFormat(date)).toBe("오전 9:30");
  });

  test("오늘 오후 시간일 경우: 오후 시간 포맷", () => {
    const date = new Date("2025-06-01T06:45:00Z");
    expect(getChattingDateFormat(date)).toBe("오후 3:45");
  });

  test("올해지만 어제 날짜일 경우: MM.DD 포맷", () => {
    const date = new Date("2025-05-30T15:00:00Z");
    expect(getChattingDateFormat(date)).toBe("05. 31.");
  });

  test("올해 초 날짜일 경우: MM.DD 포맷", () => {
    const date = new Date("2025-01-01T08:00:00Z");
    expect(getChattingDateFormat(date)).toBe("01. 01.");
  });

  test("작년 날짜일 경우: YY.MM.DD 포맷", () => {
    const date = new Date("2024-12-31T00:00:00Z");
    expect(getChattingDateFormat(date)).toBe("24. 12. 31.");
  });
});
