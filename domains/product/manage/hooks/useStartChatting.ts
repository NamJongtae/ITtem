import useStartChatMutate from "@/domains/chat/room-list/hooks/mutations/useStartChatMutate";

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
