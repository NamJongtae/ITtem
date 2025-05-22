import { getDateFormat } from "@/utils/getDateFormate";
import Image from "next/image";

interface IProps {
  wishCount: number;
  viewCount: number;
  createdAt: string | Date;
}

export default function ProductDetailContentInfoStats({
  wishCount,
  viewCount,
  createdAt
}: IProps) {
  return (
    <div className="flex gap-3">
      <span className="flex gap-2">
        <Image
          src={"/icons/heart-icon.svg"}
          alt="찜 횟수"
          width={14}
          height={28}
        />{" "}
        {wishCount}
      </span>
      <span className="flex gap-2 items-center">
        <Image
          className="w-[20px] h-[14px]"
          src={"/icons/eye-icon.svg"}
          alt="조회수"
          width={20}
          height={14}
        />{" "}
        {viewCount}
      </span>
      <time dateTime={createdAt.toString()} className="flex gap-2 items-center">
        <Image
          src={"/icons/clock-icon.svg"}
          alt="게시일"
          width={16}
          height={16}
        />{" "}
        {getDateFormat(createdAt.toString() || "")}
      </time>
    </div>
  );
}
