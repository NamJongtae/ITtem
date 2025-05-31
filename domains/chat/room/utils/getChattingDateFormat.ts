export default function getChattingDateFormat(inputDate: Date): string {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // 오늘 0시 기준

  const dateOnly = new Date(inputDate);
  dateOnly.setHours(0, 0, 0, 0);

  const diff = Math.floor((now.getTime() - dateOnly.getTime()) / 1000);
  const diffInDays = diff / (60 * 60 * 24);

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours < 12 ? "오전" : "오후";
    const hourFor12 = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${period} ${hourFor12}:${formattedMinutes}`;
  };

  if (diffInDays < 1) return formatTime(inputDate);

  if (diffInDays < 365) {
    return inputDate.toLocaleDateString("ko-KR", {
      month: "2-digit",
      day: "2-digit"
    });
  }

  return inputDate.toLocaleDateString("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit"
  });
}
