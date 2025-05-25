import { toast } from "react-toastify";

export const imgValidation = (file: File) => {
  const reg = /(.*?)\.(jpg|jpeg|png|svg)$/;
  // 파일 확인
  if (!file) {
    return false;
  }

  // 이미지 지원 형식 확인
  if (!reg.test(file.name)) {
    toast.warn(
      `${
        file.name.length > 10 ? file.name.substring(0, 20) + "..." : file.name
      }은(는)\n 지원하는 형식이 아닙니다.`
    );
    return false;
  }

  // 파일 사이즈 확인
  if (file.size > 1024 * 1024 * 10) {
    toast.warn("크기를 초과하였습니다.(최대 10MB)");
    return false;
  }

  // 모두 만족 한다면 true 반환
  return true;
};
