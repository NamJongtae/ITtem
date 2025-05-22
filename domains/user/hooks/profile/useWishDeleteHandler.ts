import { toast } from "react-toastify";
import useDeleteProfileWishMutate from "./mutations/useDeleteProfileWishMutate";
import { useRef } from "react";

export default function useWishDeleteHandler(selectedWish: string[]) {
  const allCheckBoxInputRef = useRef<HTMLInputElement | null>(null);
  const { deleteWishMutate } = useDeleteProfileWishMutate();

  const onClickDelete = () => {
    if (!selectedWish.length) {
      toast.warn("삭제 할 목록이 없어요.");
      return;
    }
    const isDelete = confirm("정말 삭제하시겠어요?");
    if (isDelete) {
      deleteWishMutate(selectedWish);
      if (allCheckBoxInputRef.current) {
        allCheckBoxInputRef.current.checked = false;
      }
    }
  };

  return { allCheckBoxInputRef, onClickDelete };
}
