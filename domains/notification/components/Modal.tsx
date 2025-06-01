import { RefObject, forwardRef } from "react";
import List from "./List";
import Header from "./Header";
import { escKeyClose } from "@/shared/common/utils/escKeyClose";
import useNotificaitonModal from "@/domains/notification/hooks/useNotificaitonModal";
import SuspenseErrorBoundary from "@/shared/common/components/SuspenseErrorBoundary";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

interface IProps {
  isOpenModal: boolean;
  toggleNotification: () => void;
}

const Modal = forwardRef<HTMLDivElement, IProps>(
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
        <Header />
        <SuspenseErrorBoundary
          suspenseFallback={<Loading />}
          errorFallback={<ErrorMessage />}
        >
          <List />
        </SuspenseErrorBoundary>
      </div>
    );
  }
);

Modal.displayName = "NotificationModal";

export default Modal;
