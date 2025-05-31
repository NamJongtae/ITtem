export default function getChatRoomListDateFormat(inputDate: Date): string {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // 오늘 자정

  const dataTime = new Date(inputDate);
  dataTime.setHours(0, 0, 0, 0); // 입력값 자정

  const diffInSeconds = (now.getTime() - dataTime.getTime()) / 1000;
  const diffInDays = diffInSeconds / (60 * 60 * 24);

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  };

  // 오늘 날짜인 경우 → 시간 표시
  if (diffInDays < 1) {
    const hours = inputDate.getHours();
    const period = hours < 12 ? "오전" : "오후";
    const hourFor12 = hours % 12 === 0 ? 12 : hours % 12;

    const formattedTime = inputDate
      .toLocaleTimeString("ko-KR", timeOptions)
      .replace(/^(\d{2})/, hourFor12.toString().padStart(2, "0"));

    return `${period} ${formattedTime}`;
  }

  // 어제인 경우 정확한 날짜 비교
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (
    dataTime.getFullYear() === yesterday.getFullYear() &&
    dataTime.getMonth() === yesterday.getMonth() &&
    dataTime.getDate() === yesterday.getDate()
  ) {
    return "어제";
  }

  // 1년 이내인 경우 MM.DD 형식
  if (diffInDays < 365) {
    return inputDate.toLocaleDateString("ko-KR", {
      month: "2-digit",
      day: "2-digit"
    });
  }

  // 1년 이상인 경우 YY.MM.DD 형식
  return inputDate.toLocaleDateString("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit"
  });
}
