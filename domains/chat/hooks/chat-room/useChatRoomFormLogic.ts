import { useParams } from "next/navigation";
import { RefObject } from "react";
import { FieldValues, useForm } from "react-hook-form";
import useSendChatMessageMuate from "./mutations/useSendChatMessageMutate";
import { toast } from "react-toastify";

interface IParams {
  chatListRef: RefObject<HTMLUListElement | null>;
}

export default function useChatRoomFormLogic({ chatListRef }: IParams) {
  const params = useParams();
  const { chatRoomId } = params;

  const scrollToBottom = () => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  };

  const { mutate } = useSendChatMessageMuate(scrollToBottom);
  const { handleSubmit, register, formState, resetField } = useForm({
    defaultValues: { message: "" },
    mode: "onSubmit"
  });

  const onSumbitMessage = (values: FieldValues) => {
    const message = values.message;
    if (!message || !values.message.trim()) {
      toast.warn("메세지를 입력해주세요.");
      return;
    }
    mutate({ chatRoomId: chatRoomId as string, message });
    resetField("message");
  };

  const isDisable = !formState.isDirty || !!formState.errors["message"];

  return { handleSubmit, register, formState, isDisable, onSumbitMessage };
}
