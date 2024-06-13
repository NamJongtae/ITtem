import ChatSendIcon from "@/public/icons/chat_send_icon.svg";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TextareaAutosize from "react-textarea-autosize";
import useSendToChatMessageMutate from "@/hooks/reactQuery/mutations/chat/useSendToChatMessageMutate";
import { useRouter } from "next/router";
import { MutableRefObject } from "react";

interface IProps {
  chatListRef: MutableRefObject<HTMLUListElement | null>;
}

export default function ChatRoomForm({ chatListRef }: IProps) {
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

  return (
    <form
      onSubmit={handleSubmit(onSumbitMessage)}
      className="absolute bottom-0 flex justify-between items-center border-t w-full px-3 text-sm p-3 gap-2 bg-white"
    >
      <TextareaAutosize
        className="focus:outline-none focus:none resize-none text-black overflow-hidden leading-4 w-full"
        placeholder="메세지 입력"
        maxRows={5}
        minRows={1}
        maxLength={300}
        {...register("message", {
          required: true,
        })}
      />
      <button type="submit" disabled={isDisable}>
        <ChatSendIcon
          className={`${isDisable ? "fill-gray-300" : "fill-blue-500"}`}
        />
      </button>
    </form>
  );
}
