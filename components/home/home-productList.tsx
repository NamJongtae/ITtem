import ProductList from '../commons/productList/product-list';

export default function HomeProductList() {
  return (
    <section>
      <h2 className="font-semibold text-xl sm:text-2xl text-center mt-8 mb-10">
        오늘의 상품
      </h2>
      <ProductList />
    </section>
  );
}
