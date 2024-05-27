import { useRouter } from "next/router";

export default function PurchaseTradingChattingBtn() {
  const router = useRouter();
  const onClickChatting = () => {
    router.push("/chat");
  };
  return (
    <button
      type="button"
      onClick={onClickChatting}
      className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
    >
      채팅하기
    </button>
  );
}
