import useStartChatMutate from "../reactQuery/mutations/chat/useStartChatMutate";

interface IParams {
  productId: string | undefined;
  userId: string | undefined;
}

export default function useTradingChattingBtn({
  productId,
  userId,
}: IParams) {
  const { mutate, isPending } = useStartChatMutate();
  const handleClickchatting = () => {
    if (!productId || !userId) return;

    mutate({ productId, userId });
  };

  return { isPending, handleClickchatting };
}
