import Loading from "@/app/loading";
import useTradingChattingBtn from "@/hooks/productManage/useTradingChattingBtn";

interface IProps {
  productId: string | undefined;
  userId: string | undefined;
}

export default function PurchaseTradingChattingBtn({
  productId,
  userId,
}: IProps) {
  const { isPending, handleClickchatting } = useTradingChattingBtn({
    productId,
    userId,
  });

  if (isPending) {
    return <Loading />;
  }

  return (
    <button
      type="button"
      onClick={handleClickchatting}
      className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
    >
      채팅하기
    </button>
  );
}
