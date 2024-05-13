import React from "react";
import Portal from "../commons/portal/Portal";
import { isMobile } from "react-device-detect";
import ChangePasswordCurrentPwField from "./changePassword-modal-currentPwField";
import ChagePasswordPwField from "./chagePassword-modal-PwField";
import ChangePasswordCheckPwField from "./changePassword-modal-PwCheckField";
import ChangePasswordCloseBtn from "./changePassword-modal-closeBtn";
import ChangePasswordFormBtns from "./changePassword-modal-form-btns";
import ChangePasswordModalForm from "./changePassword-modal-form";

interface IProps {
  closeModal: () => void;
}

export default function ChangePasswordModal({ closeModal }: IProps) {
  return (
    <Portal>
      <div
        onClick={closeModal}
        className="fixed bg-black bg-opacity-50 inset-0 z-30"
        role="modal-backdrop"
      />
      <ChangePasswordModalForm closeModal={closeModal} />
    </Portal>
  );
}
