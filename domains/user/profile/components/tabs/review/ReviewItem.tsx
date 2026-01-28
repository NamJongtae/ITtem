import { REVIEW_TAGS } from "@/domains/product/shared/constants/constants";
import { ProfileReviewData } from "../../../types/profileTypes";
import Image from "next/image";
import Link from "next/link";
import ReactStarClient from "../../ReactStarClient";

interface IProps {
  review: ProfileReviewData;
}

export default function ReviewItem({ review }: IProps) {
  return (
    <li key={review._id} className="flex gap-4 border-b pb-5 px-5">
      <Image
        className="rounded-full w-14 h-14 object-cover object-center"
        src={review?.reviewer.profileImg}
        alt={review?.reviewer.nickname}
        width={56}
        height={56}
      />
      <div>
        <div className="flex flex-col mb-3">
          <span>{review?.reviewer.nickname}</span>
          <ReactStarClient starValue={review?.reviewScore} />
        </div>
        <Link
          href={`/product/${review.productId}`}
          className="inline-flex items-center gap-2 line-clamp-1 border py-1 px-2 text-sm text-gray-500 mt-2 betterhover:hover:bg-gray-100"
        >
          {review.productName}
          <Image
            className="w-[9px] h-[11px]"
            src={"/icons/arrow-icon.svg"}
            alt=""
            width={15}
            height={19}
          />
        </Link>

        <div className="flex flex-col">
          <p className="mt-3 whitespace-pre-line">{review.reviewContent}</p>
          <ul className="flex text-xs mt-5 gap-3 flex-wrap">
            {REVIEW_TAGS.map(
              (tag, index) =>
                review?.reviewTags?.[index] === 1 && (
                  <li key={tag}>
                    <p className="bg-gray-100 py-1 px-2 rounded-md">{tag}</p>
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    </li>
  );
}
