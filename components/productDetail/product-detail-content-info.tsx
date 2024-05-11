import { getDateFormat } from "@/lib/getDateFormate";
import { ProductDetailData } from "@/types/productTypes";
import Image from "next/image";
import ProductDetailReportBtn from "./product-detail-reportBtn";

interface IProps {
  productDetailData: ProductDetailData | undefined;
}

export default function ProductDetailContentInfo({
  productDetailData,
}: IProps) {
  return (
    <>
      <h3 className="text-gray-700 text-3xl md:text-4xl">
        {productDetailData?.name}
      </h3>
      <div className="mt-3 text-gray-700 font-semibold">
        <span className="text-3xl md:text-4xl ">
          {productDetailData?.price.toLocaleString()}
        </span>
        <span className="ml-1 text-2xl">원</span>
      </div>
      <hr className="my-3" />
      <div className="flex justify-between">
        <div className="flex gap-3">
          <span className="flex gap-2">
            <Image
              src={"/icons/heart_icon.svg"}
              alt="찜 횟수"
              width={14}
              height={28}
            />{" "}
            {productDetailData?.wishCount}
          </span>
          <span className="flex gap-2 items-center">
            <Image
              className="w-[20px] h-[14px]"
              src={"/icons/eye_icon.svg"}
              alt="조회수"
              width={20}
              height={14}
            />{" "}
            {productDetailData?.viewCount}
          </span>
          <time
            dateTime={productDetailData?.createdAt?.toString()}
            className="flex gap-2 items-center"
          >
            <Image
              src={"/icons/clock_icon.svg"}
              alt="게시일"
              width={16}
              height={16}
            />{" "}
            {getDateFormat(productDetailData?.createdAt?.toString() || "")}
          </time>
        </div>
        <ProductDetailReportBtn productDetailData={productDetailData} />
      </div>

      <div className="mt-5">
        <ul>
          <li className="mb-3 flex gap-3">
            <p className="min-w-[70px] text-gray-500">상품상태</p>
            <p>{productDetailData?.condition}급</p>
          </li>
          <li className="mb-3 flex gap-3">
            <p className="min-w-[70px] text-gray-500">반품여부</p>
            <p>{productDetailData?.returnPolicy}</p>
          </li>
          <li className="mb-3 flex gap-3">
            <p className="min-w-[70px] text-gray-500">거래방식</p>
            <p>{productDetailData?.transaction}</p>
          </li>
          <li className="mb-3 flex gap-3">
            <p className="min-w-[70px] text-gray-500">거래지역</p>
            <p className="flex gap-1">
              <Image
                src={"/icons/location_icon.svg"}
                alt="지역"
                width={12}
                height={24}
              />{" "}
              {productDetailData?.location}
            </p>
          </li>
          <li className="mb-3 flex gap-3">
            <p className="min-w-[70px] text-gray-500">배송비</p>
            <p>{productDetailData?.deliveryFee}</p>
          </li>
        </ul>
      </div>
    </>
  );
}
