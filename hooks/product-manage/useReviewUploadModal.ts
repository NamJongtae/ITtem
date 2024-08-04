import { FieldValues } from "react-hook-form";
import useProductUploadReviewMutate from "../react-query/mutations/product/useProductUploadReviewMutate";

interface IParams {
  closeModal: () => void;
  productId: string;
}

export default function useReviewUploadModal({
  closeModal,
  productId,
}: IParams) {
  const { uploadReviewMutate, uploadReviewLoading } =
    useProductUploadReviewMutate(closeModal);

  const onSubmit = (values: FieldValues) => {
    const isUploadReview = confirm(
      "정말 리뷰를 작성 하겠어요? 등록 후 삭제/수정이 불가능합니다."
    );
    if (isUploadReview) {
      uploadReviewMutate({
        productId,
        reviewScore: values.score,
        reviewContent: values.content,
        reviewTags: values.tags,
      });
    }
  };
  return {
    onSubmit,
    uploadReviewLoading,
  };
}
