import { FieldValues, useForm } from "react-hook-form";
import useProductUploadReviewMutate from "../reactQuery/mutations/product/useProductUploadReviewMutate";
import { REVIEW_TAGS } from "@/constants/constant";
import { useEffect } from "react";

interface IPrarms {
  closeModal: () => void;
  productId: string;
}

export default function useReviewUploadModal({
  closeModal,
  productId,
}: IPrarms) {
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
