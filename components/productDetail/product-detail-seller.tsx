import Empty from "../commons/Empty";
import ProductDetailSellerInfo from "./product-detail-seller-info";
import ProductDetailSellerProductList from "./product-detail-seller-product-list";
import { ProductDetailAuthData } from "@/types/productTypes";

interface IProps {
  auth: ProductDetailAuthData | undefined;
}

export default function ProductDetailSeller({ auth }: IProps) {
  return (
    <section className="basis-1/3">
      <h3 className="text-gray-600 text-xl font-medium">판매자 정보</h3>
      <hr className="h-px border-0 bg-gray-500 my-3" />
      {auth?.uid ? (
        <>
          <ProductDetailSellerInfo auth={auth} />
          <ProductDetailSellerProductList auth={auth} />
        </>
      ) : (
        <Empty message={"유저가 존재하지 않아요."} />
      )}
    </section>
  );
}