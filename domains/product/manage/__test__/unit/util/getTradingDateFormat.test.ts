import getTradingDateFormat from "../../../utils/getTradingDateFormat";

describe("getTradingDateFormat 테스트", () => {
  const KST_OFFSET = 9 * 60 * 60 * 1000;

  const getUTCISOString = (timeStamp: string) => {
    // 서버에서 전달되는 데이터는 UTC시간 → 9시간을 빼주어야함
    return new Date(new Date(timeStamp).getTime() - KST_OFFSET).toISOString();
  };

  it("UTC 날짜를 KST 기준 '2025.06.01 00:00' 포맷으로 반환", () => {
    const time = getUTCISOString("2025-05-31T15:00:00Z");
    expect(getTradingDateFormat(time)).toBe("2025.06.01 00:00");
  });

  it("UTC 날짜를 KST 기준 '2025.05.01 00:00' 포맷으로 반환", () => {
    const time = getUTCISOString("2024-05-31T15:00:00Z");
    expect(getTradingDateFormat(time)).toBe("2024.06.01 00:00");
  });

  it("UTC 날짜를 KST 기준 '2025.05.01 00:00' 포맷으로 반환", () => {
    const time = getUTCISOString("2025-04-30T15:00:00Z");
    expect(getTradingDateFormat(time)).toBe("2025.05.01 00:00");
  });

  it("UTC 날짜를 KST 기준 '2025.04.30 18:00' 포맷으로 반환", () => {
    const time = getUTCISOString("2025-04-30T09:00:00Z");
    expect(getTradingDateFormat(time)).toBe("2025.04.30 18:00");
  });
});
