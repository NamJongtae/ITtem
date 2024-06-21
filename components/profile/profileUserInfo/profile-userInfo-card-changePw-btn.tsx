import useModal from "@/hooks/commons/useModal";
import ProfileEditModal from "../profileEditModal/profileEdit-modal";

export default function ProfileUserInfoCardChangePwBtn() {
  const { isOpenModal, openModal, handleClickCloseBtn } = useModal();

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="border py-2 px-4 w-full betterhover:hover:bg-gray-100"
      >
        비밀번호 변경
      </button>

      {isOpenModal && (
        <ProfileEditModal handleClickCloseBtn={handleClickCloseBtn} />
      )}
    </>
  );
}
