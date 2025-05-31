export default function getChattingDateFormat(inputDate: Date): string {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const inputDateOnly = new Date(inputDate);
  inputDateOnly.setHours(0, 0, 0, 0);

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours < 12 ? "오전" : "오후";
    const hourFor12 = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${period} ${hourFor12}:${formattedMinutes}`;
  };

  // 오늘인 경우
  if (inputDateOnly.getTime() === now.getTime()) {
    return formatTime(inputDate);
  }

  // 같은 연도면 MM.DD 포맷
  if (now.getFullYear() === inputDate.getFullYear()) {
    return inputDate.toLocaleDateString("ko-KR", {
      month: "2-digit",
      day: "2-digit"
    });
  }

  // 다른 연도면 YY.MM.DD 포맷
  return inputDate.toLocaleDateString("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit"
  });
}
