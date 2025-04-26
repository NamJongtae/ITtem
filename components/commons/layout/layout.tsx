import LayoutHeader from "./layout-header";
import LayoutFooter from "./layout-footer";
import SubNavMobileMenu from "./sub-nav/sub-nav-mobile-menu";
import LayoutSideMenu from './side-menu/layout-side-menu';


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
