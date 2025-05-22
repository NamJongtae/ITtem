import { RefObject, forwardRef } from "react";
import NotificationModalList from "./notification-modal-list";
import NotificationModalHeader from "./notification-modal-header";
import { escKeyClose } from "@/utils/optimizationKeyboard";
import useNotificaitonModal from "@/hooks/layout/useNotificaitonModal";
import SuspenseErrorBoundary from "@/components/suspense-error-boundary";
import NotificationModalLoading from "./notification-modal-loading";
import NotificaitonModalError from "./notificaiton-modal-error";

interface IProps {
  isOpenModal: boolean;
  toggleNotification: () => void;
}

const NotificationModal = forwardRef<HTMLDivElement, IProps>(
  ({ isOpenModal, toggleNotification }, ref) => {
    useNotificaitonModal({
      isOpenModal,
      toggleNotification,
      notificationModalRef: ref as RefObject<HTMLDivElement | null>
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
        <SuspenseErrorBoundary
          suspenseFallback={<NotificationModalLoading />}
          errorFallback={<NotificaitonModalError />}
        >
          <NotificationModalList />
        </SuspenseErrorBoundary>
      </div>
    );
  }
);

NotificationModal.displayName = "NotificationModal";

export default NotificationModal;
