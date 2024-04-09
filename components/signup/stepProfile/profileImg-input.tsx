import { MutableRefObject } from "react";
import { useFormContext } from "react-hook-form";

interface IProps {
  handleChangeImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imgInputRef: MutableRefObject<HTMLInputElement | null>;
}
export default function ProfileImgInput({
  handleChangeImg,
  imgInputRef,
}: IProps) {
  const { register } = useFormContext();

  return (
    <>
      <input
        className="hidden"
        type="file"
        accept="image/jpeg, image/png, image/svg+xml"
        id="profileImg"
        {...(register("profileImg"),
        {
          onChange: handleChangeImg,
        })}
        ref={(e) => {
          imgInputRef.current = e;
          register("profileImg").ref(e);
        }}
      />
    </>
  );
}
