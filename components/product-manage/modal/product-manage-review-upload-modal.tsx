import Loading from "@/components/commons/loading";
import Portal from "@/components/commons/portal/Portal";
import { REVIEW_TAGS } from "@/constants/constant";
import useReviewUploadModal from "@/hooks/productManage/useReviewUploadModal";
import { DevTool } from "@hookform/devtools";
import dynamic from "next/dynamic";
import Image from "next/image";
import { isMobile } from "react-device-detect";
import { Controller } from "react-hook-form";
const ReactStars = dynamic(() => import("react-stars"), {
  ssr: false,
  loading: () => <p>loading...</p>,
});

interface IProps {
  handleClickCloseBtn: () => void;
  productId: string;
}
export default function ProductManageReviewUploadModal({
  handleClickCloseBtn,
  productId,
}: IProps) {
  const {
    register,
    uploadReviewLoading,
    control,
    tags,
    score,
    handleCheckboxChange,
    onSubmit,
    isDisabled,
  } = useReviewUploadModal({ closeModal: handleClickCloseBtn, productId });

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
      <form onSubmit={onSubmit}>
        <div
          className={`${
            isMobile ? "h-screen" : "max-w-[480px]"
          } fixed center z-30 flex flex-col gap-3 w-full p-8 border bg-white`}
        >
          <h2
            className={`${
              isMobile ? "mt-10" : "mt-3"
            } text-xl text-center font-semibold mb-3`}
          >
            리뷰 작성
          </h2>
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

          <button
            type="submit"
            className="w-full mx-auto mt-5 py-2 px-4 bg-[#66a2fb] text-white font-medium betterhover:hover:bg-[#3c87f8] disabled:opacity-50"
            disabled={isDisabled}
          >
            리뷰 작성
          </button>
          <button
            type="button"
            onClick={handleClickCloseBtn}
            className="absolute top-3 right-3 bg-gray-500 rounded-full p-[6px]"
          >
            <Image
              src={"/icons/x_icon.svg"}
              alt="닫기"
              width={12}
              height={12}
            />
          </button>
        </div>
        <DevTool control={control} />
      </form>
    </Portal>
  );
}
