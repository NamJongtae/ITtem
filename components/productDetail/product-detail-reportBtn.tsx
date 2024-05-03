import Image from "next/image";

export default function ProductDetailReportBtn() {
  return (
    <button className="flex items-center gap-1">
      <Image
        src={"/icons/report_icon.svg"}
        alt="신고하기"
        width={28}
        height={28}
      />{" "}
      신고하기
    </button>
  );
}
