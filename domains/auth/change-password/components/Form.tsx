"use client";

import MyForm from "@/shared/common/components/MyForm";
import { isMobile } from "react-device-detect";
import { FieldValues } from "react-hook-form";
import CurrentPasswordField from "./CurrentPasswordField";
import PasswordField from "./PasswordField";
import PasswordCheckField from "./PasswordCheckField";
import CloseBtn from "./modal/CloseBtn";
import SubmitBtn from "./SubmitBtn";
import useChangePwFormLogic from "@/domains/user/profile/hooks/useChangePwFormLogic";

interface IProps {
  isModal?: boolean;
}

export default function Form({ isModal }: IProps) {
  const {
    currentPwRef,
    pwRef,
    pwCheckRef,
    closeBtnRef,
    submitBtnRef,
    closeModalHandler,
    changePasswordMutate
  } = useChangePwFormLogic({ isModal });

  return (
    <MyForm
      onSubmit={(values: FieldValues) => {
        changePasswordMutate({
          password: values.password,
          currentPassword: values["current-password"]
        });
      }}
      formOptions={{
        mode: "onChange",
        defaultValues: {
          "current-password": "",
          password: "",
          "password-check": ""
        }
      }}
      className={`${
        isMobile ? "h-screen pt-20" : "max-w-[480px] justify-center"
      } fixed center z-30 flex flex-col gap-5 w-full p-8 bg-white`}
    >
      <h2 className="text-xl text-center font-semibold mb-5">비밀번호 변경</h2>
      <CurrentPasswordField
        isModal={isModal}
        ref={currentPwRef}
        closeBtnRef={closeBtnRef}
      />
      <PasswordField ref={pwRef} />
      <PasswordCheckField ref={pwCheckRef} />

      <SubmitBtn
        isModal={isModal}
        ref={submitBtnRef}
        pwCheckRef={pwCheckRef}
        closeBtnRef={closeBtnRef}
      />

      {isModal && (
        <CloseBtn
          isModal={isModal}
          ref={closeBtnRef}
          currentPwRef={currentPwRef}
          pwCheckRef={pwCheckRef}
          submitBtnRef={submitBtnRef}
          handleClickClose={closeModalHandler}
        />
      )}
    </MyForm>
  );
}
