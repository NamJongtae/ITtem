import Empty from "@/shared/common/components/Empty";
import SellerInfo from "./SellerInfo";
import ProductList from "./SellerProductList";
import { ProductDetailAuthData } from "../../types/productDetailTypes";

interface IProps {
  auth: ProductDetailAuthData | undefined;
}

export default function SellerSection({ auth }: IProps) {
  return (
    <section className="basis-1/3">
      <h3 className="text-gray-600 text-xl font-medium">판매자 정보</h3>
      <hr className="h-px border-0 bg-gray-500 my-3" />
      {auth?.uid ? (
        <>
          <SellerInfo auth={auth} />
          <ProductList auth={auth} />
        </>
      ) : (
        <Empty message={"유저가 존재하지 않아요."} />
      )}
    </section>
  );
}
