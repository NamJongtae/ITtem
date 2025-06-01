import getChatRoomListDateFormat from "../../../utils/getChatRoomListDateFormat";

describe("getChatRoomListDateFormat", () => {
  const fixedNow = new Date("2025-05-31T15:00:00Z"); // 오늘 기준 (KST)

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(fixedNow);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("오늘이면 오전/오후 HH:MM 형식 반환", () => {
    const date = new Date("2025-06-01T00:30:00Z"); // 오늘 오전 9:30
    const result = getChatRoomListDateFormat(date);
    expect(result).toBe("오전 09:30");
  });

  it("오늘 오후 시간 반환", () => {
    const date = new Date("2025-06-01T06:45:00Z"); // 오늘 오후 3:45
    const result = getChatRoomListDateFormat(date);
    expect(result).toBe("오후 03:45");
  });

  it("어제면 '어제' 반환", () => {
    const date = new Date("2025-05-30T15:00:00Z");
    expect(getChatRoomListDateFormat(date)).toBe("어제");
  });

  it("올해 날짜면 MM.DD 형식 반환", () => {
    const date = new Date("2025-04-15T10:00:00Z");
    expect(getChatRoomListDateFormat(date)).toBe("04. 15.");
  });

  it("작년 날짜면 YY.MM.DD 형식 반환", () => {
    const date = new Date("2024-05-30T08:00:00Z");
    expect(getChatRoomListDateFormat(date)).toBe("24. 05. 30.");
  });
});
