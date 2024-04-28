import ProductList from "../commons/productList/product-list";
import ProductPageHeader from "./product-page-header";

export default function ProductPage() {
  return (
    <>
      <ProductPageHeader />
      <ProductList productListType="CATEGORY" />
    </>
  );
}
