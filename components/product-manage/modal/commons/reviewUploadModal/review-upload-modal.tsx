import Loading from "@/app/loading";
import { MyForm } from "@/components/commons/myForm/MyForm";
import Portal from "@/components/commons/portal/Portal";
import { REVIEW_TAGS } from "@/constants/constant";
import useReviewUploadModal from "@/hooks/productManage/useReviewUploadModal";
import ReviewUploadModalFormContents from "./review-upload-modal-form-contents";

interface IProps {
  handleClickCloseBtn: () => void;
  productId: string;
}
export default function ReviewUploadModal({
  handleClickCloseBtn,
  productId,
}: IProps) {
  const { uploadReviewLoading, onSubmit } = useReviewUploadModal({
    closeModal: handleClickCloseBtn,
    productId,
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
            tags: REVIEW_TAGS.map(() => 0),
          },
        }}
      >
        <ReviewUploadModalFormContents
          handleClickCloseBtn={handleClickCloseBtn}
        />
      </MyForm>
    </Portal>
  );
}
