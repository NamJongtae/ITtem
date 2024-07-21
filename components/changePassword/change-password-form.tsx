"use client";

import { MyForm } from "../commons/myForm/MyForm";
import { isMobile } from "react-device-detect";
import { FieldValues } from "react-hook-form";
import ChangePasswordModalCurrentPwField from "./change-password-currentPwField";
import ChangePasswordModalPwField from "./change-password-PwField";
import ChangePasswordModalPwCheckField from "./change-password-PwCheckField";
import Loading from "@/app/loading";
import useChagePasswordForm from "@/hooks/profile/useChagePasswordForm";
import ChangePasswordModalCloseBtn from "./change-password-close-btn";
import ChangePasswordModalSubmitBtn from "./change-password-submit-btn";

interface IProps {
  isModal?: boolean;
}

export default function ChangePasswordForm({ isModal }: IProps) {
  const {
    changePasswordLoading,
    changePasswordMutate,
    currentPwRef,
    pwRef,
    pwCheckRef,
    closeBtnRef,
    submitBtnRef,
    handleClickClose,
  } = useChagePasswordForm({
    isModal,
  });

  if (changePasswordLoading) {
    return <Loading />;
  }

  return (
    <MyForm
      onSubmit={(values: FieldValues) => {
        changePasswordMutate({
          password: values.password,
          currentPassword: values["current-password"],
        });
      }}
      formOptions={{
        mode: "onChange",
        defaultValues: {
          "current-password": "",
          password: "",
          "password-check": "",
        },
      }}
      className={`${
        isMobile ? "h-screen pt-20" : "max-w-[480px] justify-center"
      } fixed center z-30 flex flex-col gap-5 w-full p-8 bg-white`}
    >
      <h2 className="text-xl text-center font-semibold mb-5">비밀번호 변경</h2>
      <ChangePasswordModalCurrentPwField
        isModal={isModal}
        ref={currentPwRef}
        closeBtnRef={closeBtnRef}
      />
      <ChangePasswordModalPwField ref={pwRef} />
      <ChangePasswordModalPwCheckField ref={pwCheckRef} />

      <ChangePasswordModalSubmitBtn
        isModal={isModal}
        ref={submitBtnRef}
        pwCheckRef={pwCheckRef}
        closeBtnRef={closeBtnRef}
      />

      {isModal && (
        <ChangePasswordModalCloseBtn
          isModal={isModal}
          ref={closeBtnRef}
          currentPwRef={currentPwRef}
          pwCheckRef={pwCheckRef}
          submitBtnRef={submitBtnRef}
          handleClickClose={handleClickClose}
        />
      )}
    </MyForm>
  );
}
