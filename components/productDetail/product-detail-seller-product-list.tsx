import Empty from "../commons/Empty";
import ProductDetailSellerProductItem from "./product-detail-seller-product-item";
import ProductDetailSellerProductMoreBtn from "./product-detail-seller-product-moreBtn";
import { ProductDetailAuthData } from "@/types/productTypes";

interface IProps {
  auth: ProductDetailAuthData;
}

export default function ProductDetailSellerProductList({ auth }: IProps) {
  return (
    <div className="mt-2">
      <h4>판매자의 다른 상품</h4>
      <hr className="border-0 h-px mt-2 mb-5 bg-gray-200" />

      {auth.recentProducts.length === 0 ? (
        <Empty message={"상품이 존재하지 않아요."} />
      ) : (
        <>
          <ul className="grid grid-cols-autoFill_140 lg:grid-cols-autoFill_180 xl:grid-cols-3 gap-3">
            {auth.recentProducts?.map((data) => (
              <ProductDetailSellerProductItem
                key={data._id}
                productData={data}
              />
            ))}
          </ul>
          <ProductDetailSellerProductMoreBtn auth={auth} />
        </>
      )}
    </div>
  );
}
