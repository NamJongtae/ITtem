import Portal from "../../commons/portal/Portal";
import ChangePasswordModalForm from "./changePassword-modal-form";

interface IProps {
  handleClickChangePwCloseBtn: () => void;
}

export default function ChangePasswordModal({
  handleClickChangePwCloseBtn,
}: IProps) {
  return (
    <Portal>
      <div
        onClick={handleClickChangePwCloseBtn}
        className="fixed bg-black bg-opacity-50 inset-0 z-30"
      >
        <span className="sr-only">backdrop</span>
      </div>
      <ChangePasswordModalForm
        handleClickChangePwCloseBtn={handleClickChangePwCloseBtn}
      />
    </Portal>
  );
}
