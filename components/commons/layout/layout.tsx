import Header from "./layout-header";
import Footer from "./layout-footer";
import MobileNav from "./nav/layout-mobile-nav";
import dynamic from "next/dynamic";
const SideMenu = dynamic(() => import("./sideMenu/layout-sideMenu"), {
  ssr: false,
});

interface IProps {
  children: React.ReactNode;
}
export default function Layout({ children }: IProps) {
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
