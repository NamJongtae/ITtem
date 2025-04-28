"use client";

import { MyForm } from "../commons/my-form/my-form";
import { isMobile } from "react-device-detect";
import { FieldValues } from "react-hook-form";
import ChangePasswordCurrentPasswordField from "./change-password-current-password-field";
import ChangePasswordPasswordField from "./change-password-password-field";
import ChangePasswordPasswordCheckField from "./change-password-check-field";
import useChagePasswordForm from "@/hooks/profile/useChagePasswordForm";
import ChangePasswordCloseBtn from "./modal/change-password-modal-close-btn";
import ChangePasswordSubmitBtn from "./chanage-password-submit-btn";
import Loading from '../commons/loading';


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
    handleClickClose
  } = useChagePasswordForm({
    isModal
  });

  if (changePasswordLoading) {
    return <Loading />;
  }

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
      <ChangePasswordCurrentPasswordField
        isModal={isModal}
        ref={currentPwRef}
        closeBtnRef={closeBtnRef}
      />
      <ChangePasswordPasswordField ref={pwRef} />
      <ChangePasswordPasswordCheckField ref={pwCheckRef} />

      <ChangePasswordSubmitBtn
        isModal={isModal}
        ref={submitBtnRef}
        pwCheckRef={pwCheckRef}
        closeBtnRef={closeBtnRef}
      />

      {isModal && (
        <ChangePasswordCloseBtn
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
