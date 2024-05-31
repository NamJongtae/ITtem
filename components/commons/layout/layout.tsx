import Header from "./layout-header";
import Footer from "./layout-footer";
import MobileNav from "./nav/layout-mobile-nav";
import useAuth from "@/hooks/commons/useAuth";
import SideMenu from './sideMenu/layout-sideMenu';

interface IProps {
  children: React.ReactNode;
}
export default function Layout({ children }: IProps) {
  useAuth();

  return (
    <>
      <Header />
      {children}
      <MobileNav />
      <SideMenu />
      <Footer />
    </>
  );
}
