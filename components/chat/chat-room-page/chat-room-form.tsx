import ChatSendIcon from "@/public/icons/chat_send_icon.svg";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TextareaAutosize from "react-textarea-autosize";
export default function ChatRoomForm() {
  const { handleSubmit, register, formState } = useForm({
    defaultValues: { message: "" },
    mode: "onSubmit",
  });

  const isDisable = !formState.isDirty || !!formState.errors["message"];
  const onSumbitMessage = (values: FieldValues) => {
    if (!values.message || !values.message.trim()) {
      toast.warn("메세지를 입력해주세요.");
      return;
    }
    console.log(values);
  };
  
  return (
    <form
      onSubmit={handleSubmit(onSumbitMessage)}
      className="absolute bottom-0 flex justify-between items-center border-t w-full px-3 text-sm p-3 gap-2"
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
