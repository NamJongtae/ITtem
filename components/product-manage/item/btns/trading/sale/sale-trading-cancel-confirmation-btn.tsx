import useTradingCancelConfirmationBtn from "@/hooks/product-manage/useTradingCancelConfirmationBtn";

interface IProps {
  productId: string;
}

export default function SaleTradingCancelConfirmationBtn({
  productId,
}: IProps) {
  const { handleClickCancelConfirmation } = useTradingCancelConfirmationBtn({
    productId,
  });

  return (
    <button
      type="button"
      onClick={handleClickCancelConfirmation}
      className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
    >
      취소요청 확인
    </button>
  );
}
