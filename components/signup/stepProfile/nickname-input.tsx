import React from "react";
import { useFormContext } from "react-hook-form";
import { NICKNAME_REGEX, NICKNAME_REGEX_ERRORMSG } from '@/constants/constant';

export default function NicknameInput() {
  const { register} = useFormContext();

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
        pattern: {
          value: NICKNAME_REGEX,
          message: NICKNAME_REGEX_ERRORMSG,
        },
      })}
    />
  );
}
