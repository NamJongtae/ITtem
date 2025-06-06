import { ProductDetailData } from "../../types/productDetailTypes";
import Image from "next/image";

interface IProps {
  productDetailData: Partial<
    Pick<
      ProductDetailData,
      "condition" | "returnPolicy" | "transaction" | "location" | "deliveryFee"
    >
  >;
}

export default function ContentInfoList({
  productDetailData
}: IProps) {
  return (
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
              src={"/icons/location-icon.svg"}
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
  );
}
