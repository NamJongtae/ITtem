import useProductUploadBtnDisabled from "../../../hooks/useProductUploadBtnDisabled";
import { useParams } from "next/navigation";

export default function SubmitBtn() {
  const params = useParams();
  const { productId } = params;
  const isEditPage = !!productId;
  const { isDisabled } = useProductUploadBtnDisabled(isEditPage);

  return (
    <button
      type="submit"
      className="text-md text-white font-semibold bg-gray-700 py-2 w-24 disabled:opacity-50"
      disabled={isDisabled}
    >
      {isEditPage ? "수정하기" : "등록하기"}
    </button>
  );
}
