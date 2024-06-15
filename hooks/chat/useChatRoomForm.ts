import { useRouter } from "next/router";
import { MutableRefObject } from "react";
import { FieldValues, useForm } from "react-hook-form";
import useSendToChatMessageMutate from "@/hooks/reactQuery/mutations/chat/useSendToChatMessageMutate";
import { toast } from "react-toastify";

interface IParams {
  chatListRef: MutableRefObject<HTMLUListElement | null>;
}

export default function useChatRoomForm({ chatListRef }: IParams) {
  const router = useRouter();
  const { chatRoomId } = router.query;

  const scrollToBottom = () => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  };

  const { mutate } = useSendToChatMessageMutate(scrollToBottom);
  const { handleSubmit, register, formState, resetField } = useForm({
    defaultValues: { message: "" },
    mode: "onSubmit",
  });

  const isDisable = !formState.isDirty || !!formState.errors["message"];

  const onSumbitMessage = (values: FieldValues) => {
    const message = values.message;
    if (!message || !values.message.trim()) {
      toast.warn("메세지를 입력해주세요.");
      return;
    }
    mutate({ chatRoomId: chatRoomId as string, message });
    resetField("message");
  };

  return { handleSubmit, register, formState, isDisable, onSumbitMessage };
}
