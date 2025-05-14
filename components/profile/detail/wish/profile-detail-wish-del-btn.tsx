import useWishDeleteHandler from "@/hooks/profile/useWishDeleteHandler";
import CheckIcon from "@/public/icons/check-icon.svg";

interface IProps {
  selectedWish: string[];
  onClickSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileDetailWishDelBtn({
  selectedWish,
  onClickSelectAll
}: IProps) {
  const { onClickDelete } = useWishDeleteHandler({ selectedWish });

  return (
    <div className="flex items-center w-full gap-2 mb-5">
      <div className="inline-flex items-center">
        <label
          className="relative flex cursor-pointer items-center rounded-full"
          htmlFor="selectAll"
        >
          <input
            type="checkbox"
            onChange={onClickSelectAll}
            className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all  checked:border-red-400 checked:bg-red-400"
            id="selectAll"
          />
          <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
            <CheckIcon className="fill-white" />
          </div>
          <span className="sr-only">전체삭제</span>
        </label>
      </div>
      <button
        type="button"
        onClick={onClickDelete}
        className="font-medium betterhover:hover:text-red-500"
      >
        선택 삭제
      </button>
    </div>
  );
}
