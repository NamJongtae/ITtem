import { useCallback, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useModalMobileBackBtn } from "./useModalMobileBackBtn";

export default function useModal({
  isImageModal
}: { isImageModal?: boolean } = {}) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  useModalMobileBackBtn({ closeModal, isOpenModal, isImageModal });

  const handleClickCloseBtn = useCallback(() => {
    if (isMobile || isImageModal) {
      history.back();
    }
    setIsOpenModal(false);
  }, [isImageModal]);

  useEffect(() => {
    if (isOpenModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpenModal]);

  return { isOpenModal, openModal, closeModal, handleClickCloseBtn };
}
