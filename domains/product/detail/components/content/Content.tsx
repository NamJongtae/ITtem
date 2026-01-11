import { ProductDetailData } from "../../types/productDetailTypes";
import ContentInfo from "./ContentInfo";
import ContentImg from "./ContentImg";
import ContentBtns from "./ContentBtns";

interface IProps {
  productDetailData: ProductDetailData | undefined;
  showCSRSkeleton: boolean;
}

export default function Content({
  productDetailData,
  showCSRSkeleton
}: IProps) {
  return (
    <div className="md:flex block">
      <ContentImg productDetailData={productDetailData} />
      <div className="w-full mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
        <ContentInfo
          productDetailData={productDetailData}
          showCSRSkeleton={showCSRSkeleton}
        />
        <ContentBtns productDetailData={productDetailData} />
      </div>
    </div>
  );
}
