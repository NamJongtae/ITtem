import React from "react";
import { useFormContext } from "react-hook-form";

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

export default function ProductUploadConditionField() {
  const { register, getValues } = useFormContext();
  const currentCondition = getValues("condition");

  return (
    <fieldset className="border-b pb-8 relative">
      <legend className="sr-only">상품상태</legend>
      <h3 className="font-semibold text-lg pt-8">
        상품상태 <span className="text-red-500">*</span>
      </h3>
      <div className="inline-flex flex-col gap-5 mt-5">
        {["S", "A", "B", "C", "D"].map((condition) => (
          <label key={condition}>
            <input
              className="mr-2"
              type="radio"
              value={condition}
              defaultChecked={currentCondition === condition}
              {...register("condition")}
            />
            {condition}급 -{" "}
            <span className="text-sm text-gray-500">
              {getDescription(condition)}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
