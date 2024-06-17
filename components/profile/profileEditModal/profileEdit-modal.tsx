import Portal from "@/components/commons/portal/Portal";
import ProfileEditModalForm from "./profileEdit-modal-form";

interface IProps {
  handleClickProfieEditCloseBtn: () => void;
}

export default function ProfileEditModal({
  handleClickProfieEditCloseBtn,
}: IProps) {

  return (
    <Portal>
      <div
        onClick={handleClickProfieEditCloseBtn}
        className="fixed bg-black bg-opacity-50 inset-0 z-30"
        role="modal-backdrop"
      />
      <ProfileEditModalForm
        handleClickProfieEditCloseBtn={handleClickProfieEditCloseBtn}
      />
    </Portal>
  );
}
