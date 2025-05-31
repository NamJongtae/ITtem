export default function getProductDateFormat(time: string) {
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
}
