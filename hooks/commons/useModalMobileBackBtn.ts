import { useEffect } from "react";
import { isMobile } from "react-device-detect";

interface IParams {
  closeModal: () => void;
  isOpenModal: boolean;
}
export const useModalMobileBackBtn = ({
  closeModal,
  isOpenModal,
}: IParams) => {
  // 모바일 뒤로가기 구현을 위해 빈 히스토리 생성
  // 뒤로가기 버튼을 눌러도 현재 페이지가 유지
  useEffect(() => {
    if (isMobile && isOpenModal) {
      window.history.pushState(null, "", window.location.href);
    }
  }, [isOpenModal]);

  useEffect(() => {
    if (isMobile && isOpenModal) {
      const handlePopState = () => {
        closeModal();
      };

      window.onpopstate = handlePopState;

      return () => {
        window.onpopstate = null;
      };
    }
  }, [closeModal, isOpenModal]);
};
