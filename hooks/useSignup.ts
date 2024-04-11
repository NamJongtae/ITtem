import React from "react";
import { FieldValues } from "react-hook-form";
import useSignupMutate from "./querys/useSignupMutate";

export default function useSignup() {
  const { signupMutate, signupLoading } = useSignupMutate();
  const onSubmit = async (data: FieldValues) => {
    await signupMutate({
      email: data.email,
      password: data.password,
      nickname: data.nickname,
      profileImg: data.profileImg,
      introduce: data.introduce,
    });
  };

  return { onSubmit, signupLoading };
}
