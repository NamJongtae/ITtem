import useReviewModalStar from "@/domains/product/manage/hooks/useReviewModalStar";
import ReactStarClient from "@/domains/user/profile/components/ReactStarClient";
import { optimizationTabFocus } from "@/shared/common/utils/optimizationTabFocus";
import { RefObject, forwardRef } from "react";
import { Controller } from "react-hook-form";

interface IProps {
  closeBtnRef: RefObject<HTMLButtonElement | null>;
}

const ReviewStar = forwardRef<HTMLDivElement | null, IProps>(
  ({ closeBtnRef }, ref) => {
    const { control, score } = useReviewModalStar({
      starRef: ref as RefObject<HTMLDivElement | null>
    });

    return (
      <div
        className="flex items-center justify-center mb-2 gap-3"
        tabIndex={0}
        ref={ref}
        onKeyDown={(e) =>
          optimizationTabFocus({
            event: e,
            previousTarget: closeBtnRef.current
          })
        }
      >
        <h3 className="sr-only">리뷰 점수</h3>
        <Controller
          name="score"
          control={control}
          rules={{ required: true }}
          defaultValue={0}
          render={({ field }) => <ReactStarClient starValue={field.value} />}
        />
        <span className="mt-[1px] w-[20px] font-medium">{score}</span>
      </div>
    );
  }
);

ReviewStar.displayName = "ReviewUploadModalReviewStar";
export default ReviewStar;
