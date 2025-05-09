import useStartChatMutate from "../react-query/mutations/chat/useStartChatMutate";

interface IParams {
  productId: string | undefined;
  userId: string | undefined;
}

export default function useStartChatting({ productId, userId }: IParams) {
  const { mutate, isPending } = useStartChatMutate();

  const startChatting = () => {
    if (!productId || !userId) return;

    mutate({ productId, userId });
  };

  return { isPending, startChatting };
}
