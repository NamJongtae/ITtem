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
  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    watch,
    control,
    formState,
  } = useForm({
    defaultValues: { score: 0, content: "", tags: REVIEW_TAGS.map(() => 0) },
  });

  const tags = watch("tags");
  const score = watch("score");

  const handleCheckboxChange = (index: number) => {
    const updatedTags = [...tags];
    updatedTags[index] = updatedTags[index] === 0 ? 1 : 0;
    setValue("tags", updatedTags, { shouldDirty: true, shouldValidate: true });
  };

  const onSubmit = handleSubmit((values: FieldValues) => {
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
  });

  const isDisabled =
    !formState.dirtyFields["score"] || !formState.dirtyFields["content"];

  useEffect(() => {
    register("tags");
    return () => unregister("tags");
  }, [register, unregister]);

  return {
    register,
    uploadReviewLoading,
    control,
    tags,
    score,
    handleCheckboxChange,
    onSubmit,
    isDisabled,
  };
}
