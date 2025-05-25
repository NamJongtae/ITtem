import useRouterBackToCloseModal from "@/shared/common/hooks/useRouterBackToCloseModal";

export default function CancelBtn() {
  const { closeModalHandler } = useRouterBackToCloseModal();

  return (
    <button
      type="button"
      onClick={closeModalHandler}
      className="button_secondary w-full"
    >
      취소
    </button>
  );
}
