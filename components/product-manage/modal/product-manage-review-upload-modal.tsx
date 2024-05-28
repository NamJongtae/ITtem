import Loading from "@/components/commons/loading";
import Portal from "@/components/commons/portal/Portal";
import { REVIEW_TAGS } from "@/constants/constant";
import useProductUploadReviewMutate from "@/hooks/querys/useProductUploadReviewMutate";
import { DevTool } from "@hookform/devtools";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { isMobile } from "react-device-detect";
import { Controller, FieldValues, useForm } from "react-hook-form";
const ReactStars = dynamic(() => import("react-stars"), {
  ssr: false,
  loading: () => <p>loading...</p>,
});

interface IProps {
  closeModal: () => void;
  productId: string;
}
export default function ProductManageReviewUploadModal({
  closeModal,
  productId,
}: IProps) {
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

  const onSubmit = (values: FieldValues) => {
    const isUploadReview = confirm(
      "정말 리뷰를 등록 하겠어요? 등록 후 삭제/수정이 불가능합니다."
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

  const isDisabled =
    !formState.dirtyFields["score"] || !formState.dirtyFields["content"];

  useEffect(() => {
    register("tags");
    return () => unregister("tags");
  }, [register, unregister]);

  if (uploadReviewLoading) {
    return <Loading />;
  }

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
          <h2 className="text-xl text-center font-semibold mb-3">리뷰 등록</h2>
          <div className="flex items-center justify-center mb-2 gap-3">
            <h3 className="sr-only">리뷰 점수</h3>
            <Controller
              name="score"
              control={control}
              rules={{ required: true }}
              defaultValue={0}
              render={({ field }) => (
                <ReactStars
                  value={field.value}
                  onChange={field.onChange}
                  size={24}
                  half
                  color1="#ddd"
                  color2="#fec323"
                />
              )}
            />
            <span className="mt-[1px] w-[20px] font-medium">{score}</span>
          </div>

          <h3 className="sr-only">리뷰 태그</h3>
          {REVIEW_TAGS.map((tag, index) => (
            <label
              key={tag}
              className={`${
                tags[index] === 1 ? "bg-blue-200" : "bg-gray-100"
              } rounded-md py-2 px-4 box-border font-medium cursor-pointer betterhover:hover:bg-blue-200 transition-all duration-100`}
            >
              <input
                className="hidden"
                type="checkbox"
                value={tag}
                checked={tags[index] === 1}
                onChange={() => handleCheckboxChange(index)}
              />
              {tag}
            </label>
          ))}

          <label className="sr-only" htmlFor={"content"}>
            리뷰 작성
          </label>
          <textarea
            className="root_input resize-none mt-3"
            {...register("content", {
              required: true,
            })}
            rows={6}
            id={"content"}
            placeholder="리뷰를 입력해주세요."
            maxLength={300}
          />
          <div className="flex justify-end gap-3 mt-5">
            <button
              type="submit"
              className="py-2 px-4 bg-[#66a2fb] text-white font-medium betterhover:hover:bg-[#3c87f8] disabled:opacity-50"
              disabled={isDisabled}
            >
              리뷰 등록
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
