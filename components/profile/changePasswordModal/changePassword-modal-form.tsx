import { MyForm } from "../../commons/myForm/MyForm";
import { isMobile } from "react-device-detect";
import { FieldValues } from "react-hook-form";
import ChangePasswordModalCurrentPwField from "./changePassword-modal-currentPwField";
import ChangePasswordModalPwField from "./changePassword-modal-PwField";
import ChangePasswordModalPwCheckField from "./changePassword-modal-PwCheckField";
import Loading from "../../commons/loading";
import useChagePasswordModalForm from "@/hooks/profile/useChagePasswordModalForm";
import ChangePasswordModalCancelBtn from "./changePassword-modal-cancel-btn";
import ChangePasswordModalSubmitBtn from "./changePassword-modal-submit-btn";

interface IProps {
  handleClickChangePwCloseBtn: () => void;
}
export default function ChangePasswordModalForm({
  handleClickChangePwCloseBtn,
}: IProps) {
  const {
    changePasswordLoading,
    changePasswordMutate,
    currentPwRef,
    pwRef,
    pwCheckRef,
    cancelBtnRef,
    submitBtnRef,
  } = useChagePasswordModalForm({
    closeModal: handleClickChangePwCloseBtn,
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
        isMobile ? "h-screen" : "max-w-[480px]"
      } fixed center z-30 flex flex-col gap-5 justify-center w-full p-8 border bg-white`}
    >
      <h2 className="text-xl text-center font-semibold mb-5">비밀번호 변경</h2>
      <ChangePasswordModalCurrentPwField
        ref={currentPwRef}
        submitBtnRef={submitBtnRef}
        cancelBtnRef={cancelBtnRef}
      />
      <ChangePasswordModalPwField ref={pwRef} />
      <ChangePasswordModalPwCheckField ref={pwCheckRef} />

      <div className="mt-8 flex gap-3 justify-end">
        <ChangePasswordModalCancelBtn
          ref={cancelBtnRef}
          currentPwRef={currentPwRef}
          pwCheckRef={pwCheckRef}
          submitBtnRef={submitBtnRef}
          handleClickChangePwCloseBtn={handleClickChangePwCloseBtn}
        />
        <ChangePasswordModalSubmitBtn
          ref={submitBtnRef}
          currentPwRef={currentPwRef}
          cancelBtnRef={cancelBtnRef}
          handleClickChangePwCloseBtn={handleClickChangePwCloseBtn}
        />
      </div>
    </MyForm>
  );
}