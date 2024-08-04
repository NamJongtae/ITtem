import { startChat } from "@/lib/api/chat";
import { StartChatResponseData } from "@/types/api-types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function useStartChatMutate() {
  const router = useRouter();

  const { mutate, isPending } = useMutation<
    AxiosResponse<StartChatResponseData>,
    AxiosError,
    { productId: string; userId: string }
  >({
    mutationFn: ({ productId, userId }) => startChat({ productId, userId }),
    onSuccess: (response) => {
      router.push(`/chat/${response.data.chatRoomId}`);
    },
    onError: () => {
      toast.warn("채팅방 이동에 실패했어요.\n잠시 후 다시 시도해주세요.");
    },
  });
  return { mutate, isPending };
}
