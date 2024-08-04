import SearchHeader from "./search-header";
import ProductList from "../commons/product-list/product-list";

export default function SearchPage() {
  return (
    <>
      <SearchHeader />
      <ProductList productListType="SEARCH" />
    </>
  );
}
