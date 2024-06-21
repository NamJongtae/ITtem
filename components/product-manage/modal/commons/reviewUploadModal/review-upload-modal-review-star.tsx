import useReviewUploadModalReviewStar from "@/hooks/productManage/useReviewUploadModalReviewStar";
import { optimizationTabFocus } from "@/lib/optimizationKeyboard";
import dynamic from "next/dynamic";
import { MutableRefObject, forwardRef } from "react";
import { Controller } from "react-hook-form";
const ReactStars = dynamic(() => import("react-stars"), {
  ssr: false,
  loading: () => <p>loading...</p>,
});

interface IProps {
  closeBtnRef: MutableRefObject<HTMLButtonElement | null>;
}

const ReviewUploadModalReviewStar = forwardRef<HTMLDivElement | null, IProps>(
  ({ closeBtnRef }, ref) => {
    const { control, score } = useReviewUploadModalReviewStar({
      starRef: ref as MutableRefObject<HTMLDivElement | null>,
    });

    return (
      <div
        className="flex items-center justify-center mb-2 gap-3"
        tabIndex={0}
        ref={ref}
        onKeyDown={(e) =>
          optimizationTabFocus({ event: e, previousTarget: closeBtnRef.current })
        }
      >
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
    );
  }
);

ReviewUploadModalReviewStar.displayName = "ReviewUploadModalReviewStar";
export default ReviewUploadModalReviewStar;
