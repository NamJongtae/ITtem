import Banner from "./hom-banner";
import ProductList from './home-product-list';

export default function HomePage() {
  return (
    <>
      <h2 className='sr-only'>홈 페이지</h2>
      <Banner />
      <ProductList />
    </>
  );
}
