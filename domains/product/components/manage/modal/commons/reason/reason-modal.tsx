import Portal from "@/components/portal/Portal";
import useReasonModalRefs from "@/domains/product/hooks/manage/useReasonModalRefs";
import { FieldValues } from "react-hook-form";
import { MyForm } from "@/components/my-form/my-form";
import ReasonModalFormContents from "./reason-modal-form-contents";

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
        <ReasonModalFormContents
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
