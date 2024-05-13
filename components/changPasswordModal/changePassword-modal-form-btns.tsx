import { useFormContext } from "react-hook-form";

interface IProps {
  closeModal: () => void;
}
export default function ChangePasswordModalFormBtns({ closeModal }: IProps) {
  const { formState } = useFormContext();

  const isDirty =
    formState.dirtyFields["current-password"] &&
    formState.dirtyFields["password"] &&
    formState.dirtyFields["password-check"];

  const isErrors =
    formState.errors["current-password"] ||
    formState.errors["password"] ||
    formState.errors["password-check"];

  const isDisabled = !isDirty || !!isErrors;
  
  return (
    <div className="mt-8 flex gap-3 justify-end">
      <button
        type="button"
        onClick={closeModal}
        className="py-2 px-4 bg-gray-400 text-white font-medium betterhover:hover:bg-gray-600"
      >
        취소하기
      </button>
      <button
        type="submit"
        disabled={isDisabled}
        className="py-2 px-4 bg-[#66a2fb] text-white font-medium betterhover:hover:bg-[#3c87f8] disabled:opacity-50"
      >
        변경하기
      </button>
    </div>
  );
}
