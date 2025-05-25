import MyForm from "@/shared/common/components/MyForm";
import Portal from "@/shared/common/components/Portal";
import { REVIEW_TAGS } from "@/domains/product/shared/constants/constants";
import useReviewUploadModal from "@/domains/product/manage/hooks/useReviewUploadSubmit";
import FormContent from "./FormContent";
import Loading from "@/shared/common/components/Loading";

interface IProps {
  handleClickCloseBtn: () => void;
  productId: string;
}
export default function Modal({ handleClickCloseBtn, productId }: IProps) {
  const { uploadReviewLoading, onSubmit } = useReviewUploadModal({
    closeModal: handleClickCloseBtn,
    productId
  });

  if (uploadReviewLoading) {
    return <Loading />;
  }

  return (
    <Portal>
      <div
        onClick={handleClickCloseBtn}
        className="fixed bg-black bg-opacity-50 inset-0 z-30"
        role="modal-backdrop"
      />
      <MyForm
        onSubmit={onSubmit}
        formOptions={{
          defaultValues: {
            score: 0,
            content: "",
            tags: REVIEW_TAGS.map(() => 0)
          }
        }}
      >
        <FormContent handleClickCloseBtn={handleClickCloseBtn} />
      </MyForm>
    </Portal>
  );
}
