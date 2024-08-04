import ChatSendIcon from "@/public/icons/chat-send-icon.svg";
import TextareaAutosize from "react-textarea-autosize";
import { MutableRefObject } from "react";
import useChatRoomForm from "@/hooks/chat-room/useChatRoomForm";

interface IProps {
  chatListRef: MutableRefObject<HTMLUListElement | null>;
}

export default function ChatRoomForm({ chatListRef }: IProps) {
  const { handleSubmit, register, isDisable, onSumbitMessage } =
    useChatRoomForm({ chatListRef });

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
      <button type="submit" disabled={isDisable} aria-label="전송">
        <ChatSendIcon
          className={`${isDisable ? "fill-gray-300" : "fill-blue-500"}`}
        />
      </button>
    </form>
  );
}
