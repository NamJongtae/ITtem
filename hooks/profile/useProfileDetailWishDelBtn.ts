import { toast } from "react-toastify";
import useDeleteProfileWishMutate from "../reactQuery/mutations/profile/useDeleteProfileWishMutate";

interface IPrarms {
  selectedWish: string[];
}

export default function useProfileDetailWishDelBtn({ selectedWish }: IPrarms) {
  const { deleteWishMutate } = useDeleteProfileWishMutate();

  const handleClickDelete = () => {
    if (!selectedWish.length) {
      toast.warn("삭제 할 목록이 없어요.");
      return;
    }
    const isDelete = confirm("정말 삭제하시겠어요?");
    if (isDelete) {
      deleteWishMutate(selectedWish);
    }
  };

  return { handleClickDelete };
}
