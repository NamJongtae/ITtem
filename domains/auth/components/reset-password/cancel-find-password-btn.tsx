import useRouterBackToCloseModal from "@/hooks/useRouterBackToCloseModal";

export default function CancelFindPasswordBtn() {
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
