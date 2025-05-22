import { REVIEW_TAGS } from "@/domains/product/constants/constants";

interface IProps {
  reviewTags: number[] | undefined;
}
export default function ReviewModalReviewTags({ reviewTags }: IProps) {
  return (
    <>
      <h3 className="sr-only">리뷰 태그</h3>
      <ul className="flex flex-col gap-3">
        {reviewTags &&
          REVIEW_TAGS.map((tag, index) => (
            <li
              className={`${
                reviewTags[index] === 1 ? "bg-blue-200" : "bg-gray-100"
              } rounded-md py-2 px-4 box-border font-medium`}
              key={tag}
            >
              {tag}
            </li>
          ))}
      </ul>
    </>
  );
}
