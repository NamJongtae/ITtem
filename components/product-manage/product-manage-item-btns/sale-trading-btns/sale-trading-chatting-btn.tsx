import useTradingChattingBtn from "@/hooks/productManage/useTradingChattingBtn";

interface IProps {
  productId: string | undefined;
  userId: string | undefined;
}
export default function SaleTradingChattingBtn({ productId, userId }: IProps) {
  const { handleClickchatting } = useTradingChattingBtn({ productId, userId });

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
