import Loading from "@/shared/common/components/Loading";
import useStartChatting from "@/domains/product/manage/hooks/useStartChatting";

interface IProps {
  productId: string | undefined;
  userId: string | undefined;
}

export default function ChattingBtn({ productId, userId }: IProps) {
  const { isPending, startChatting } = useStartChatting({
    productId,
    userId
  });

  if (isPending) {
    return <Loading />;
  }

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
