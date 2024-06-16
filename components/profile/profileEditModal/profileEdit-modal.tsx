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
