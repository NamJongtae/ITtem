import FallbackImage from "@/shared/common/components/FallbackImage";
import { RecentProductData } from "@/shared/layout/types/layoutTypes";
import Link from "next/link";

interface IProps {
  recentProductData: RecentProductData;
}
export default function SliderItem({ recentProductData }: IProps) {
  return (
    <li key={recentProductData.productId} className="h-[100px] min-w-[100px]">
      <Link href={`/product/${recentProductData.productId}`}>
        <FallbackImage
          className="object-cover object-center"
          src={recentProductData.productImg}
          alt={recentProductData.productName}
          width={160}
          height={160}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
        />
      </Link>
    </li>
  );
}
