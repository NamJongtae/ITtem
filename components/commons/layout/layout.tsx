import LayoutHeader from "./layout-header";
import LayoutFooter from "./layout-footer";
import SubNavMobileMenu from "./sub-nav/sub-nav-mobile-menu";
import dynamic from "next/dynamic";
const LayoutSideMenu = dynamic(() => import("./side-menu/layout-side-menu"), {
  ssr: false,
});

interface IProps {
  children: React.ReactNode;
}
export default function Layout({ children }: IProps) {
  return (
    <>
      <LayoutHeader />
      {children}
      <SubNavMobileMenu />
      <LayoutSideMenu />
      <LayoutFooter />
    </>
  );
}
