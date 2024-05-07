import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ProductDetailChattingBtn() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleClickChatting = () => {
    if (!user) {
      toast.warn("로그인 후 이용해주세요.");
      return;
    }
    router.push("/chat");
  };

  return (
    <button
      type="button"
      onClick={handleClickChatting}
      className="px-8 py-2 bg-yellow-500 text-white text-sm font-medium rounded hover:betterhover:bg-yellow-400 focus:outline-none focus:bg-yellow-500 md:px-6"
    >
      채팅하기
    </button>
  );
}
