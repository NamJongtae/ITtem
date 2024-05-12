import { isMobile } from "react-device-detect";
import ProfileEditImgField from "./profileEdit-img-field";
import ProfileEditNicknameField from "./profileEdit-nickname-field";
import ProfileEditIntroduceField from "./profileEdit-introduce-field";
import ProfileEditButtons from "./profileEdit-buttons";
import ProfileEditCloseBtn from "./profileEdit-closeBtn";
import Portal from "@/components/commons/portal/Portal";
import ProfileEditModalForm from "./profileEdit-modal-form";

interface IProps {
  closeModal: () => void;
}

export default function ProfileEditModal({ closeModal }: IProps) {
  return (
    <Portal>
      <div
        onClick={closeModal}
        className="fixed bg-black bg-opacity-50 inset-0 z-30"
        role="modal-backdrop"
      />
      <ProfileEditModalForm closeModal={closeModal} />
    </Portal>
  );
}
