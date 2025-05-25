import { REVIEW_TAGS } from "@/domains/product/shared/constants/constants";
import useReviewRegisterTags from "@/domains/product/manage/hooks/useReviewRegisterTags";
import useReviewTagToggle from "@/domains/product/manage/hooks/useReviewTagToggle";

export default function ReviewTags() {
  const { tags, onChangeCheckbox } = useReviewTagToggle();
  useReviewRegisterTags();

  return (
    <>
      <h3 className="sr-only">리뷰 태그</h3>
      {REVIEW_TAGS.map((tag, index) => (
        <label
          key={tag}
          tabIndex={0}
          className={`${
            tags[index] === 1 ? "bg-blue-200" : "bg-gray-100"
          } rounded-md py-2 px-4 box-border font-medium cursor-pointer betterhover:hover:bg-blue-200 transition-all duration-100`}
        >
          <input
            className="hidden"
            type="checkbox"
            value={tag}
            checked={tags[index] === 1}
            onChange={() => onChangeCheckbox(index)}
          />
          {tag}
        </label>
      ))}
    </>
  );
}
