import Empty from "@/shared/common/components/Empty";
import SellerProductItem from "./SellerProductItem";
import SellerProductMoreBtn from "./SellerProductMoreBtn";
import { ProductDetailAuthData } from "../../types/productDetailTypes";

interface IProps {
  auth: ProductDetailAuthData;
}

export default function SellerProductList({ auth }: IProps) {
  const isNotExistProduct = auth.recentProducts.length === 0;

  return (
    <div className="mt-2">
      <h4>판매자의 다른 상품</h4>
      <hr className="border-0 h-px mt-2 mb-5 bg-gray-200" />

      {isNotExistProduct ? (
        <Empty message={"상품이 존재하지 않아요."} />
      ) : (
        <>
          <ul className="grid grid-cols-autoFill_140 lg:grid-cols-autoFill_180 xl:grid-cols-3 gap-3">
            {auth.recentProducts?.map((data) => (
              <SellerProductItem key={data._id} productData={data} />
            ))}
          </ul>
          <SellerProductMoreBtn auth={auth} />
        </>
      )}
    </div>
  );
}
