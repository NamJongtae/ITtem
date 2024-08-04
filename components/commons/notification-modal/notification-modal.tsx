import { MutableRefObject, forwardRef } from "react";
import NotificationModalList from "./notification-modal-list";
import NotificationModalHeader from "./notification-modal-header";
import { escKeyClose } from "@/lib/optimizationKeyboard";
import useNotificaitonModal from "@/hooks/commons/layout/useNotificaitonModal";

interface IProps {
  isOpenModal: boolean;
  toggleNotification: () => void;
}

const NotificationModal = forwardRef<HTMLDivElement, IProps>(
  ({ isOpenModal, toggleNotification }, ref) => {
    useNotificaitonModal({
      isOpenModal,
      toggleNotification,
      notificationModalRef: ref as MutableRefObject<HTMLDivElement | null>,
    });

    return (
      <div
        className="absolute z-30 w-[300px] h-[427px] bg-white border border-gray-300 rounded-md top-12 -right-3 md:top-16 sm:-right-7 animate-entering"
        ref={ref}
        onKeyDown={(e) =>
          escKeyClose({ event: e, closeCb: toggleNotification })
        }
      >
        <NotificationModalHeader />
        <NotificationModalList />
      </div>
    );
  }
);

NotificationModal.displayName = "NotificationModal";

export default NotificationModal;
