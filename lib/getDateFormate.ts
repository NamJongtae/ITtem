export const getDateFormat = (time: string) => {
  const now = new Date();
  const dataTime = new Date(time);
  const diff = Math.floor((now.getTime() - dataTime.getTime()) / 1000);

  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(diff / (60 * 60));
  const days = Math.floor(diff / (24 * 60 * 60));
  const week = Math.floor(diff / (24 * 60 * 60 * 7));

  if (diff < 60) {
    return "방금 전";
  } else if (diff < 60 * 60) {
    return `${minutes}분 전`;
  } else if (diff < 24 * 60 * 60) {
    return `${hours}시간 전`;
  } else if (diff < 24 * 60 * 60 * 7) {
    return `${days}일 전`;
  } else if (diff <= 30 * 24 * 60 * 60) {
    return `${week}주 전`;
  } else {
    return `${dataTime.getFullYear()}. ${(
      "0" +
      (dataTime.getMonth() + 1)
    ).slice(-2)}. ${("0" + dataTime.getDate()).slice(-2)}.`;
  }
};

export const getTradingDateFormat = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

export const getChatDateFormat = (inputDate: Date): string => {
  const now = new Date();
  const dataTime = new Date(inputDate);

  const diff = Math.floor((now.getTime() - dataTime.getTime()) / 1000);
  const diffInDays = diff / (60 * 60 * 24); // 차이를 일 단위로 계산

  // "hour12" 옵션을 false로 설정하여 24시간제를 사용합니다.
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  // 하루 이내 차이인 경우
  if (diffInDays < 1) {
    const hours = dataTime.getHours();
    const period = hours < 12 ? "오전" : "오후";
    const hourFor12 = hours % 12 === 0 ? 12 : hours % 12;
    const formattedTime = dataTime
      .toLocaleTimeString("ko-KR", options)
      .replace(/^(\d{2})/, hourFor12.toString().padStart(2, "0"));
    return `${period} ${formattedTime}`;
  }

  // 하루 차이인 경우
  if (diffInDays < 2) {
    return "어제";
  }

  // 1년 이내 차이인 경우
  if (diffInDays < 365) {
    return dataTime.toLocaleDateString("ko-KR", {
      month: "2-digit",
      day: "2-digit",
    });
  }

  // 1년 이상 차이인 경우
  return dataTime.toLocaleDateString("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
};
