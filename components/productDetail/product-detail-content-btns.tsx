import ProductDetailBuyBtn from "./product-detail-buyBtn";
import ProductDetailChattingBtn from "./product-detail-chattingBtn";
import ProductDetailWishBtn from "./product-detail-wishBtn";

export default function ProductDetailContentBtns() {
  return (
    <div className="flex items-center mt-6 gap-3">
      <ProductDetailWishBtn />
      <ProductDetailChattingBtn />
      <ProductDetailBuyBtn />
    </div>
  );
}
