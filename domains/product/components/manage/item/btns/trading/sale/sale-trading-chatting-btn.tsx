import useStartChatting from "@/domains/product/hooks/manage/useStartChatting";

interface IProps {
  productId: string | undefined;
  userId: string | undefined;
}
export default function SaleTradingChattingBtn({ productId, userId }: IProps) {
  const { startChatting } = useStartChatting({ productId, userId });

  return (
    <button
      type="button"
      onClick={startChatting}
      className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
    >
      채팅하기
    </button>
  );
}
