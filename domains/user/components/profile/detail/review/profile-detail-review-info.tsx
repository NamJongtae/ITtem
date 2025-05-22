import dynamic from "next/dynamic";
import { ProfileReviewData } from "@/domains/user/types/profile-types";
import { REVIEW_TAGS } from "@/domains/product/constants/constants";
import { calculateReviewStar } from "@/utils/product";
const ReactStars = dynamic(() => import("react-stars"), {
  ssr: false,
  loading: () => <p>loading...</p>
});

interface IProps {
  reviewInfo: ProfileReviewData | undefined;
}

export default function ProfileDetailReviewInfo({ reviewInfo }: IProps) {
  const reviewStar = calculateReviewStar({
    totalReviewCount: reviewInfo?.totalReviewCount || 0,
    totalReviewScore: reviewInfo?.totalReviewScore || 0
  });

  return (
    <>
      <div className="border p-3 rounded-md flex items-center justify-center">
        <span className="relative before:w-[1px] before:h-4 before:bg-black before:absolute before:-right-[7px] before:top-[6px]">
          평가{" "}
          <span className="font-semibold">
            {reviewInfo?.reviewPercentage
              ? `${reviewInfo.reviewPercentage}%`
              : "없음"}
          </span>
        </span>
        <div className="flex gap-1 items-center">
          <span className="ml-3">평점 </span>
          <ReactStars
            size={20}
            half
            value={reviewStar}
            color1="#ddd"
            color2="#fec323"
            edit={false}
          />
          <span className="font-semibold">{reviewStar}</span>
        </div>
      </div>
      <ul className="flex flex-col gap-2 mt-5">
        {REVIEW_TAGS.map((tag, index) => (
          <li
            className="w-full flex justify-between bg-gray-100 rounded-md py-2 px-4"
            key={tag}
          >
            <p>{tag}</p>
            <span className="font-semibold text-gray-400">
              {reviewInfo?.reviewTags[index]}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
