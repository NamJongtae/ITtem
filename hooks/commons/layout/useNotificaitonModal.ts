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
}
