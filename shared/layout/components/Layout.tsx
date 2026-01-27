import Header from "./Header";
import Footer from "./Footer";
import SideMenu from "./side-menu/SideMenu";
import MobileMenuClient from "./sub-nav/MobileMenuClient";

interface IProps {
  children: React.ReactNode;
}
export default function Layout({ children }: IProps) {
  return (
    <>
      <Header />
      {children}
      <MobileMenuClient />
      <SideMenu />
      <Footer />
    </>
  );
}
