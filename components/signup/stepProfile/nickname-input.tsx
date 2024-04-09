import React from "react";
import { useFormContext } from "react-hook-form";
import { nicknameErrorMsg, nicknameRegx } from "./nickname-field";
import useProfileNickname from "@/hooks/useProfileNickname";

export default function NicknameInput() {
  const { register} = useFormContext();
  const { handleChangeNickname } = useProfileNickname();

  return (
    <input
      className="root_input"
      type="text"
      id="nickname"
      placeholder="닉네임을 입력해주세요."
      autoComplete="off"
      minLength={4}
      maxLength={8}
      {...register("nickname", {
        required: "닉네임을 입력해주세요.",
        onChange: handleChangeNickname,
        pattern: {
          value: nicknameRegx,
          message: nicknameErrorMsg,
        },
      })}
    />
  );
}
