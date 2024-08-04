import { toast } from "react-toastify";
import useDeleteProfileWishMutate from "../react-query/mutations/profile/useDeleteProfileWishMutate";

interface IParams {
  selectedWish: string[];
}

export default function useProfileDetailWishDelBtn({ selectedWish }: IParams) {
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
