import ProductList from "../commons/productList/product-list";
import SearchPageHeader from "./search-page-header";

export default function SearchPage() {
  return (
    <>
      <SearchPageHeader />
      <ProductList productListType="SEARCH" />
    </>
  );
}
