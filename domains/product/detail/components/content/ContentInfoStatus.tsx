import getProductDateFormat from "@/domains/product/shared/utils/getProductDateFormat";
import Image from "next/image";
import ContentInfoClientStatus from "./ContentInfoClientStatus";

interface IProps {
  createdAt: string | Date;
}

export default function ContentInfoStats({ createdAt }: IProps) {
  return (
    <div className="flex gap-3">
      <ContentInfoClientStatus />

      {/* 게시일 (변경 없음) */}
      <time dateTime={createdAt.toString()} className="flex gap-2 items-center">
        <Image
          src="/icons/clock-icon.svg"
          alt="게시일"
          width={16}
          height={16}
        />
        {getProductDateFormat(createdAt.toString())}
      </time>
    </div>
  );
}
