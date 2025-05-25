import Header from "./Header";
import Footer from "./Footer";
import SubNavMobileMenu from "./sub-nav/MobileMenu";
import SideMenu from "./side-menu/SideMenu";

interface IProps {
  children: React.ReactNode;
}
export default function Layout({ children }: IProps) {
  return (
    <>
      <Header />
      {children}
      <SubNavMobileMenu />
      <SideMenu />
      <Footer />
    </>
  );
}
