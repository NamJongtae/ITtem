import dynamic from "next/dynamic";
const ReactStars = dynamic(() => import("react-stars"), {
  ssr: false,
  loading: () => <p>loading...</p>
});

interface IProps {
  reviewScore: number | undefined;
}

export default function ReviewStar({ reviewScore }: IProps) {
  return (
    <div className="flex items-center justify-center mb-2 gap-3">
      <h3 className="sr-only">리뷰 점수</h3>
      <ReactStars
        value={reviewScore || 0}
        size={24}
        half
        edit={false}
        color1="#ddd"
        color2="#fec323"
      />
      <span className="mt-[1px] w-[20px] font-medium">{reviewScore || 0}</span>
    </div>
  );
}
