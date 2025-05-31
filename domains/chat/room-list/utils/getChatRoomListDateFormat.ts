export default function getChatRoomListDateFormat(inputDate: Date): string {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const dataTime = new Date(inputDate);
  dataTime.setHours(0, 0, 0, 0);

  const diff = Math.floor((now.getTime() - dataTime.getTime()) / 1000);
  const diffInDays = diff / (60 * 60 * 24);

  // "hour12" 옵션을 false로 설정하여 24시간제를 사용합니다.
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  };

  // 자정을 기준으로 하루 이내 차이인 경우
  if (diffInDays < 1) {
    const hours = new Date(inputDate).getHours();
    const period = hours < 12 ? "오전" : "오후";
    const hourFor12 = hours % 12 === 0 ? 12 : hours % 12;
    const formattedTime = new Date(inputDate)
      .toLocaleTimeString("ko-KR", options)
      .replace(/^(\d{2})/, hourFor12.toString().padStart(2, "0"));
    return `${period} ${formattedTime}`;
  }

  // 자정을 기준으로 하루 차이인 경우
  if (diffInDays < 2 && now.getDate() - dataTime.getDate() === 1) {
    return "어제";
  }

  // 1년 이내 차이인 경우
  if (diffInDays < 365) {
    return new Date(inputDate).toLocaleDateString("ko-KR", {
      month: "2-digit",
      day: "2-digit"
    });
  }

  // 1년 이상 차이인 경우
  return new Date(inputDate).toLocaleDateString("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit"
  });
}
