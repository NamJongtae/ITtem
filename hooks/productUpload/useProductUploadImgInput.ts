import { useFormContext } from "react-hook-form";

interface IPrarms {
  onChangeImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function useProductUploadImgInput({ onChangeImg }: IPrarms) {
  const { register } = useFormContext();
  const { ...rest } = register("imgData", {
    onChange: onChangeImg,
    validate: (values) => values.length || "이미지를 선택해주세요.",
  });

  return { register, rest };
}
