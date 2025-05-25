import useCancelConfirmationHandler from "@/domains/product/manage/hooks/useCancelConfirmationHandler";

interface IProps {
  productId: string;
}

export default function CancelConfirmationBtn({
  productId
}: IProps) {
  const { onClickCancelConfirmation } = useCancelConfirmationHandler({
    productId
  });

  return (
    <button
      type="button"
      onClick={onClickCancelConfirmation}
      className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
    >
      취소요청 확인
    </button>
  );
}
