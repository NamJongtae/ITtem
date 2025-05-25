import { RefObject } from "react";
import { useFocusing } from "../../../shared/common/hooks/useFocusing";
import { useModalMobileBackBtn } from "../../../shared/common/hooks/useModalMobileBackBtn";

interface IParams {
  notificationModalRef: RefObject<HTMLDivElement | null>;
  isOpenModal: boolean;
  toggleNotification: () => void;
}

export default function useNotificaitonModal({
  notificationModalRef,
  isOpenModal,
  toggleNotification
}: IParams) {
  useFocusing(notificationModalRef);
  useModalMobileBackBtn({ isOpenModal, closeModal: toggleNotification });
}
