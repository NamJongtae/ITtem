import useAddWishMutate from "@/hooks/querys/useAddWishMutate";
import useDeleteWishMutate from "@/hooks/querys/useDeleteWishMutate";
import Image from "next/image";

interface IProps {
  isWish: boolean | undefined;
}

export default function ProductDetailWishBtn({ isWish }: IProps) {
  const { addWishMutate } = useAddWishMutate();
  const { deleteWishMutate } = useDeleteWishMutate();

  const handleClickWish = () => {
    if (isWish) {
      deleteWishMutate(undefined);
    } else {
      addWishMutate(undefined);
    }
  };
  return (
    <button
      type="button"
      onClick={handleClickWish}
      className="flex gap-2 items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:betterhover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
    >
      <Image
        src={isWish ? "/icons/heart_icon.svg" : "/icons/heart_unfill_icon.svg"}
        width={12}
        height={12}
        alt={isWish ? "찜해제" : "찜하기"}
      />{" "}
      {isWish ? "찜해제" : "찜하기"}
    </button>
  );
}
