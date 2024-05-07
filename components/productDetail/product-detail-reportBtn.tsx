import useProductReportMutate from "@/hooks/querys/useProductReportMutate";
import Image from "next/image";

export default function ProductDetailReportBtn() {
  const { productReportMutate } = useProductReportMutate();

  return (
    <button
      type="button"
      onClick={() => productReportMutate()}
      className="flex items-center gap-1"
    >
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
