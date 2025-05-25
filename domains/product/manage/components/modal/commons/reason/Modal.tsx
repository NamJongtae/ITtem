import Portal from "@/shared/common/components/Portal";
import useReasonModalRefs from "@/domains/product/manage/hooks/useReasonModalRefs";
import { FieldValues } from "react-hook-form";
import MyForm from "@/shared/common/components/MyForm";
import FormContent from "./FormContent";

interface IProps {
  handleClickCloseBtn: () => void;
  title: string;
  options: string[];
  name: string;
  submitBtnText: string;
  onSubmit: (values: FieldValues) => void;
}
export default function ReasonModal({
  handleClickCloseBtn,
  title,
  options,
  name,
  submitBtnText,
  onSubmit
}: IProps) {
  const { selectorRef, textareaRef, closeBtnRef, submitBtnRef } =
    useReasonModalRefs();

  return (
    <Portal>
      <div
        onClick={handleClickCloseBtn}
        className="fixed bg-black bg-opacity-50 inset-0 z-30"
        role="modal-backdrop"
      />
      <MyForm
        onSubmit={onSubmit}
        formOptions={{ defaultValues: { [name]: "", [`textarea${name}`]: "" } }}
      >
        <FormContent
          name={name}
          title={title}
          selectorRef={selectorRef}
          closeBtnRef={closeBtnRef}
          submitBtnRef={submitBtnRef}
          submitBtnText={submitBtnText}
          textareaRef={textareaRef}
          options={options}
          handleClickCloseBtn={handleClickCloseBtn}
        />
      </MyForm>
    </Portal>
  );
}
