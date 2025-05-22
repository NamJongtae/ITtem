import useReturnConfirmationHandler from "@/domains/product/hooks/manage/useReturnConfirmationHandler";

interface IProps {
  productId: string;
}

export default function SaleTradingReturnConfirmationBtn({
  productId
}: IProps) {
  const { onClickReturnConfirmation } = useReturnConfirmationHandler({
    productId
  });

  return (
    <button
      type="button"
      onClick={onClickReturnConfirmation}
      className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
    >
      반품요청 확인
    </button>
  );
}
