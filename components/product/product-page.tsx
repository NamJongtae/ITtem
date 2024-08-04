import ProductList from "../commons/product-list/product-list";
import Header from "./product-header";

export default function ProductPage() {
  return (
    <>
      <Header />
      <ProductList productListType="CATEGORY" />
    </>
  );
}
