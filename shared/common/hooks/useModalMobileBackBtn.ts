import { useEffect } from "react";
import { isMobile } from "react-device-detect";

interface IParams {
  closeModal: () => void;
  isOpenModal: boolean;
  isImageModal?: boolean;
}
export const useModalMobileBackBtn = ({
  closeModal,
  isOpenModal,
  isImageModal
}: IParams) => {
  // 모바일 뒤로가기 구현을 위해 빈 히스토리 생성
  // 뒤로가기 버튼을 눌러도 현재 페이지가 유지
  useEffect(() => {
    if ((isMobile || isImageModal) && isOpenModal) {
      window.history.pushState({ modal: true }, "", window.location.href);
    }
  }, [isOpenModal, isImageModal]);

  useEffect(() => {
    if ((isMobile || isImageModal) && isOpenModal) {
      const handlePopState = () => {
        closeModal();
      };

      window.onpopstate = handlePopState;

      return () => {
        window.onpopstate = null;
      };
    }
  }, [closeModal, isOpenModal, isImageModal]);

  // 새로고침시 모달 history.state가 남아있는 경우
  // history 제거
  useEffect(() => {
    if (window.history.state?.modal) {
      window.history.back();
    }
  }, []);
};
