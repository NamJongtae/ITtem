import Portal from "@/shared/common/components/Portal";
import useProductReviewQuery from "@/domains/product/manage/hooks/queries/useProductReviewQuery";
import { isMobile } from "react-device-detect";
import ReviewStar from "./ReviewStar";
import ReviewTags from "./ReviewTags";
import Reviewer from "./Reviewer";
import Content from "./Content";
import CloseBtn from "./CloseBtn";
import Header from "./Header";
import BackDrop from "./BackDrop";
import { escKeyClose } from "@/shared/common/utils/escKeyClose";
import Empty from "@/shared/common/components/Empty";

interface IProps {
  productId: string;
  handleClickCloseBtn: () => void;
}

export default function Modal({ productId, handleClickCloseBtn }: IProps) {
  const { data } = useProductReviewQuery({
    productId,
    closeModal: handleClickCloseBtn
  });

  return (
    <Portal>
      <BackDrop handleClickCloseBtn={handleClickCloseBtn} />

      <div
        className={`${
          isMobile ? "h-screen" : "max-w-[480px]"
        } fixed center z-30 flex flex-col gap-3 w-full p-8 border bg-white`}
        onKeyDown={(e) =>
          escKeyClose({ event: e, closeCb: handleClickCloseBtn })
        }
      >
        {!data ? (
          <>
            <Header />
            <Empty message="리뷰가 존재하지 않아요." />
            <CloseBtn handleClickCloseBtn={handleClickCloseBtn} />
          </>
        ) : (
          <>
            <Header />

            <Reviewer reviewer={data?.reviewer} />

            <ReviewStar reviewScore={data?.reviewScore} />

            <ReviewTags reviewTags={data?.reviewTags} />

            <Content reviewContent={data?.reviewContent} />

            <CloseBtn handleClickCloseBtn={handleClickCloseBtn} />
          </>
        )}
      </div>
    </Portal>
  );
}
