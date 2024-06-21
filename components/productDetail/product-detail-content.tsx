import { ProductDetailData } from "@/types/productTypes";
import ProductDetailContentInfo from "./product-detail-content-info";
import ProductDetailContentImg from "./product-detail-content-img";
import ProductDetailContentBtns from './product-detail-content-btns';


interface IProps {
  productDetailData: ProductDetailData | undefined;
}

export default function ProductDetailContent({ productDetailData }: IProps) {
  return (
    <div className="md:flex block">
      <ProductDetailContentImg productDetailData={productDetailData} />
      <div className="w-full mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
        <ProductDetailContentInfo productDetailData={productDetailData} />
        <ProductDetailContentBtns productDetailData={productDetailData}/>
      </div>
    </div>
  );
}
