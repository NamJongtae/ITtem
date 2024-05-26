import Portal from "@/components/commons/portal/Portal";
import { DevTool } from "@hookform/devtools";
import { isMobile } from "react-device-detect";
import { FieldValues, useForm } from "react-hook-form";

interface IProps {
  closeModal: () => void;
  title: string;
  options: string[];
  name: string;
  submitBtnText: string;
  onSubmit: (values: FieldValues) => void;
}
export default function ProductManageModal({
  closeModal,
  title,
  options,
  name,
  submitBtnText,
  onSubmit,
}: IProps) {
  const textareaName = name + "Text";
  const { register, handleSubmit, watch, formState, control } = useForm({
    mode: "onChange",
    defaultValues: { [name]: "", [textareaName]: "" },
  });

  const selectValue = watch(name);
  const textareaValue = watch(textareaName);

  const isDisabled =
    !formState.isDirty ||
    !!formState.errors[name] ||
    !!formState.errors[textareaName] ||
    !!(selectValue === "직접입력" && !formState.dirtyFields[textareaName]);

  return (
    <Portal>
      <div
        onClick={closeModal}
        className="fixed bg-black bg-opacity-50 inset-0 z-30"
        role="modal-backdrop"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`${
            isMobile ? "h-screen center" : "max-w-[480px] center"
          } fixed z-30 flex flex-col justify-center gap-3 w-full p-8 border bg-white`}
        >
          <h2 className="text-xl text-center font-semibold mb-5">{title}</h2>
          <select
            className="border rounded-md px-2 py-1"
            {...register(name, {
              required: selectValue !== "직접입력",
            })}
          >
            {options.map((option, index) => (
              <option value={index === 0 ? "" : option} key={option}>
                {option}
              </option>
            ))}
          </select>
          <label className="sr-only" htmlFor={textareaName}>
            {title} 직접입력
          </label>
          <textarea
            className="root_input resize-none mt-3"
            {...register(textareaName)}
            rows={6}
            id={textareaName}
            placeholder="직접입력"
            disabled={selectValue !== "직접입력"}
            maxLength={300}
          />
          <div className="flex justify-end gap-3">
            <button
              type="submit"
              className="py-2 px-4 bg-[#66a2fb] text-white font-medium betterhover:hover:bg-[#3c87f8] disabled:opacity-50"
              disabled={isDisabled}
            >
              {submitBtnText}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="py-2 px-4 bg-gray-400 text-white font-medium betterhover:hover:bg-gray-600"
            >
              취소하기
            </button>
          </div>
        </div>
        <DevTool control={control} />
      </form>
    </Portal>
  );
}
