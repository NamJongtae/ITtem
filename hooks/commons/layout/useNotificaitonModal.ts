import { MutableRefObject } from "react";
import { useFocusing } from "../useFocusing";
import { useModalMobileBackBtn } from "../useModalMobileBackBtn";

interface IParams {
  notificationModalRef: MutableRefObject<HTMLDivElement | null>;
  isOpenModal: boolean;
  toggleNotification: () => void;
}

export default function useNotificaitonModal({
  notificationModalRef,
  isOpenModal,
  toggleNotification,
}: IParams) {
  useFocusing(notificationModalRef);
  useModalMobileBackBtn({ isOpenModal, closeModal: toggleNotification });

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (
      typeof notificationModalRef !== "function" &&
      notificationModalRef?.current &&
      e.relatedTarget &&
      notificationModalRef.current.contains(e.relatedTarget as Node)
    ) {
      return;
    }
    toggleNotification();
  };

  return { handleBlur };
}
