import { useFormContext } from "react-hook-form";

export default function useProductUploadConditionField() {
  const { register, getValues } = useFormContext();
  const currentCondition = getValues("condition");

  // 조건에 따른 상품 상태 설명 반환 함수
  function getDescription(condition: string) {
    switch (condition) {
      case "S":
        return "사용하지 않은 새 상품";
      case "A":
        return "사용 하였지만 깨끗한 외관";
      case "B":
        return "눈에 띄는 기스나 흔적이 조금 있음";
      case "C":
        return "눈에 띄는 기스나 흔적이 많이 있음";
      case "D":
        return "고장/파손";
      default:
        return "알 수 없음";
    }
  }

  return { register, currentCondition, getDescription };
}
