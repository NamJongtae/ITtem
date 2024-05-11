import { ProductDetailAuthData } from "@/types/productTypes";
import Image from "next/image";
import Link from "next/link";
import ProductDetailSerllerFollowBtn from './product-detail-serller-followBtn';

interface IProps {
  auth: ProductDetailAuthData;
}

export default function ProductDetailSellerInfo({ auth }: IProps) {
  return (
    <div className="flex items-center gap-3">
      <Link
        href={`/profile/${auth.uid}`}
        className="inline-flex items-center gap-4 rounded-md p-3 "
      >
        <Image
          className="inline-block h-14 w-14 cursor-pointer rounded-full object-cover object-center mr-1 border-2"
          src={auth?.profileImg || "/icons/user_icon.svg"}
          alt="판매자"
          width={56}
          height={56}
        />
        <div>
          <span>{auth.nickname}</span>
          <span className="block text-gray-500 text-sm">
            {auth.reviewPercentage === 0
              ? "리뷰없음"
              : `평가 : ${auth.reviewPercentage}%`}
          </span>
        </div>
      </Link>
      <ProductDetailSerllerFollowBtn
        uid={auth.uid}
        authFollowers={auth.followers}
      />
    </div>
  );
}