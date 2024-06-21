import Portal from "@/components/commons/portal/Portal";
import ProfileEditModalForm from "./profileEdit-modal-form";

interface IProps {
  handleClickCloseBtn: () => void;
}

export default function ProfileEditModal({
  handleClickCloseBtn,
}: IProps) {

  return (
    <Portal>
      <div
        onClick={handleClickCloseBtn}
        className="fixed bg-black bg-opacity-50 inset-0 z-30"
        role="modal-backdrop"
      />
      <ProfileEditModalForm
        handleClickProfieEditCloseBtn={handleClickCloseBtn}
      />
    </Portal>
  );
}
