import useProfileDetailWishDelBtn from "@/hooks/profile/useProfileDetailWishDelBtn";

interface IProps {
  selectedWish: string[];
  handleSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileDetailWishDelBtn({
  selectedWish,
  handleSelectAll,
}: IProps) {
  const { handleClickDelete } = useProfileDetailWishDelBtn({ selectedWish });

  return (
    <div className="flex items-center w-full gap-2 mb-5">
      <div className="inline-flex items-center">
        <label
          className="relative flex cursor-pointer items-center rounded-full"
          htmlFor="selectAll"
        >
          <input
            type="checkbox"
            onChange={handleSelectAll}
            className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all  checked:border-red-400 checked:bg-red-400"
            id="selectAll"
          />
          <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <span className="sr-only">전체삭제</span>
        </label>
      </div>
      <button
        type="button"
        onClick={handleClickDelete}
        className="font-medium betterhover:hover:text-red-500"
      >
        선택 삭제
      </button>
    </div>
  );
}
