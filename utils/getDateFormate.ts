export const getDateFormat = (time: string) => {
  const now = new Date();
  const dataTime = new Date(time);

  // UTC → KST 변환 (밀리초 단위로 +9시간 추가)
  const kstTime = new Date(dataTime.getTime() + 9 * 60 * 60 * 1000);

  const diff = Math.floor((now.getTime() - kstTime.getTime()) / 1000);
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(diff / (60 * 60));
  const days = Math.floor(diff / (24 * 60 * 60));
  const week = Math.floor(diff / (24 * 60 * 60 * 7));

  if (diff < 60) return "방금 전";
  if (diff < 60 * 60) return `${minutes}분 전`;
  if (diff < 24 * 60 * 60) return `${hours}시간 전`;
  if (diff < 24 * 60 * 60 * 7) return `${days}일 전`;
  if (diff <= 30 * 24 * 60 * 60) return `${week}주 전`;

  return `${kstTime.getFullYear()}. ${String(kstTime.getMonth() + 1).padStart(2, "0")}. ${String(kstTime.getDate()).padStart(2, "0")}.`;
};

// 거래 시간 변환 함수
export const getTradingDateFormat = (dateString: string) => {
  const date = new Date(dateString);
  const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  const year = kstDate.getFullYear();
  const month = String(kstDate.getMonth() + 1).padStart(2, "0");
  const day = String(kstDate.getDate()).padStart(2, "0");
  const hours = String(kstDate.getHours()).padStart(2, "0");
  const minutes = String(kstDate.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

// 채팅방 리스트 날짜 변환 함수
export const getChatRoomListDateFormat = (inputDate: Date): string => {
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
};

// 채팅 날짜 변환 함수
export const getChattingDateFormat = (inputDate: Date): string => {
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
};
