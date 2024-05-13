import { MyForm } from "../commons/myForm/MyForm";
import { isMobile } from "react-device-detect";
import { FieldValues } from "react-hook-form";
import ChangePasswordModalCurrentPwField from './changePassword-modal-currentPwField';
import ChagePasswordModalPwField from './chagePassword-modal-PwField';
import ChangePasswordModalPwCheckField from './changePassword-modal-PwCheckField';
import ChangePasswordModalFormBtns from './changePassword-modal-form-btns';

interface IProps {
  closeModal: () => void;
}
export default function ChangePasswordModalForm({ closeModal }: IProps) {
  return (
    <MyForm
      onSubmit={(values: FieldValues) => {
        console.log(values);
      }}
      formOptions={{
        mode: "onChange",
        defaultValues: {
          "current-password": "",
          password: "",
          "passowrd-check": "",
        },
      }}
      className={`${
        isMobile ? "h-screen" : "max-w-[480px]"
      } fixed center z-30 flex flex-col gap-5 justify-center w-full p-8 border bg-white`}
    >
      <h2 className="text-xl text-center font-semibold mb-5">비밀번호 변경</h2>
      <ChangePasswordModalCurrentPwField />
      <ChagePasswordModalPwField />
      <ChangePasswordModalPwCheckField />
      <ChangePasswordModalFormBtns closeModal={closeModal} />
    </MyForm>
  );
}