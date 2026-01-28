import ReactStarClient from "@/domains/user/profile/components/ReactStarClient";

interface IProps {
  reviewScore: number | undefined;
}

export default function ReviewStar({ reviewScore }: IProps) {
  return (
    <div className="flex items-center justify-center mb-2 gap-3">
      <h3 className="sr-only">리뷰 점수</h3>
      <ReactStarClient starValue={reviewScore || 0} />
      <span className="mt-[1px] w-[20px] font-medium">{reviewScore || 0}</span>
    </div>
  );
}
