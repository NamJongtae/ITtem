import { MyForm } from "@/components/my-form/my-form";
import Portal from "@/components/portal/Portal";
import { REVIEW_TAGS } from "@/domains/product/constants/constants";
import useReviewUploadModal from "@/domains/product/hooks/manage/useReviewUploadSubmit";
import FormContents from "./review-upload-modal-form-contents";
import Loading from "@/components/loading";

interface IProps {
  handleClickCloseBtn: () => void;
  productId: string;
}
export default function ReviewUploadModal({
  handleClickCloseBtn,
  productId
}: IProps) {
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
        <FormContents handleClickCloseBtn={handleClickCloseBtn} />
      </MyForm>
    </Portal>
  );
}
