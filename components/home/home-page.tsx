import HomeBanner from "./home-banner";
import HomeProductList from './home-productList';

export default function HomePage() {
  return (
    <>
      <h2 className='sr-only'>홈 페이지</h2>
      <HomeBanner />
      <HomeProductList />
    </>
  );
}
