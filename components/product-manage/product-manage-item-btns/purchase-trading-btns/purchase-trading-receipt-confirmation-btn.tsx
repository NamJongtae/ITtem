import useProductReceiptConfirmationMutate from '@/hooks/querys/useProductReceiptConfirmationMutate';

interface IProps {
  productId: string;
}

export default function PurchaseTradingReceiptConfirmationBtn({
  productId,
}: IProps) {
  const { productReceiptConfirmationMutate } = useProductReceiptConfirmationMutate();

  const onClickReceiptComfirmation = () => {
    const isReceiptConfirmation = confirm("정말 상품을 인수 확인을 하겠어요?");
    if (isReceiptConfirmation) {
      productReceiptConfirmationMutate(productId);
    }
  };
  return (
    <button
      type="button"
      onClick={onClickReceiptComfirmation}
      className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
    >
      상품 인수 확인
    </button>
  );
}
