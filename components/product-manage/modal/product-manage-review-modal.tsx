import Loading from "@/components/commons/loading";
import Portal from "@/components/commons/portal/Portal";
import { REVIEW_TAGS } from "@/constants/constant";
import useProductReviewQuery from "@/hooks/reactQuery/querys/product/useProductReviewQuery";
import dynamic from "next/dynamic";
import Image from "next/image";
import { isMobile } from "react-device-detect";
const ReactStars = dynamic(() => import("react-stars"), {
  ssr: false,
  loading: () => <p>loading...</p>,
});
interface IProps {
  productId: string;
  closeModal: () => void;
}

export default function ProductManageReviewModal({
  productId,
  closeModal,
}: IProps) {
  const { data, isLoading } = useProductReviewQuery({ productId, closeModal });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Portal>
      <div
        onClick={closeModal}
        className="fixed bg-black bg-opacity-50 inset-0 z-30"
        role="modal-backdrop"
      />
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
          리뷰
        </h2>
        <div className="flex justify-center items-center flex-col gap-2">
          <h3 className="sr-only">작성자</h3>
          <Image
            className="w-20 h-20 object-cover object-center rounded-full border"
            src={data?.reviewer.profileImg || "/icons/user_icon.svg"}
            alt={data?.reviewer.nickname || ""}
            width={80}
            height={80}
          />
          <span className="font-medium text-lg">{data?.reviewer.nickname}</span>
        </div>

        <div className="flex items-center justify-center mb-2 gap-3">
          <h3 className="sr-only">리뷰 점수</h3>
          <ReactStars
            value={data?.reviewScore}
            size={24}
            half
            edit={false}
            color1="#ddd"
            color2="#fec323"
          />
          <span className="mt-[1px] w-[20px] font-medium">
            {data?.reviewScore}
          </span>
        </div>

        <h3 className="sr-only">리뷰 태그</h3>
        <ul className="flex flex-col gap-3">
          {REVIEW_TAGS.map((tag, index) => (
            <li
              className={`${
                data?.reviewTags[index] === 1 ? "bg-blue-200" : "bg-gray-100"
              } rounded-md py-2 px-4 box-border font-medium`}
              key={tag}
            >
              {tag}
            </li>
          ))}
        </ul>
        <h3 className="sr-only">리뷰 내용</h3>
        <p className=" w-full max-h-[200px] border rounded-md py-3 pl-4 pr-8 text-sm bg-gray-100 whitespace-pre-wrap overflow-y-auto mt-2">
          {data?.reviewContent}
        </p>
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-3 right-3 bg-gray-500 rounded-full p-[6px]"
        >
          <Image src={"/icons/x_icon.svg"} alt="닫기" width={12} height={12} />
        </button>
      </div>
    </Portal>
  );
}
