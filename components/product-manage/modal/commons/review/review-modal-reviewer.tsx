import { ProductReviewData } from "@/types/productTypes";
import Image from "next/image";

interface IProps {
  reviewer:
    | Pick<ProductReviewData["reviewer"], "nickname" | "profileImg">
    | undefined;
}

export default function ReviewModalReviewer({ reviewer }: IProps) {
  return (
    <div className="flex justify-center items-center flex-col gap-2">
      <h3 className="sr-only">작성자</h3>
      <Image
        className="w-20 h-20 object-cover object-center rounded-full border"
        src={reviewer?.profileImg || "/icons/user_icon.svg"}
        alt={reviewer?.nickname || ""}
        width={80}
        height={80}
      />
      <span className="font-medium text-lg">{reviewer?.nickname}</span>
    </div>
  );
}
