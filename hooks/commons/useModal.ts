import { useCallback, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useModalMobileBackBtn } from "./useModalMobileBackBtn";

export default function useModal() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  useModalMobileBackBtn({ closeModal, isOpenModal });

  const handleClickCloseBtn = useCallback(() => {
    if (isMobile) {
      history.back();
    }
    setIsOpenModal(false);
  }, []);

  useEffect(() => {
    if (isOpenModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpenModal]);

  return { isOpenModal, openModal, closeModal, handleClickCloseBtn };
}
