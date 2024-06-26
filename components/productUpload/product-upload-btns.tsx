import useProductUploadBtns from "@/hooks/productUpload/useProductUploadBtns";

interface IProps {
  isEdit?: boolean;
}

export default function ProductUploadBtns({ isEdit }: IProps) {
  const { handleClickCancle, isDisabled } = useProductUploadBtns(isEdit);

  return (
    <div className="flex gap-3 justify-end w-full mt-5">
      <button
        type="button"
        onClick={handleClickCancle}
        className="text-md text-gray-500 font-semibold bg-white border border-gray-400 py-2 w-24"
      >
        취소하기
      </button>
      <button
        type="submit"
        className="text-md text-white font-semibold bg-gray-700 py-2 w-24 disabled:opacity-50"
        disabled={isDisabled}
      >
        등록하기
      </button>
    </div>
  );
}
