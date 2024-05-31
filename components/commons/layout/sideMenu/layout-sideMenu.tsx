import dynamic from "next/dynamic";
import SideMenuTopBtn from "./top-btn/sideMenu-top-btn";

const SideMenuRecentProduct = dynamic(
  import("./recent-product/sideMenu-recentProduct"),
  {
    ssr: false,
  }
);

export default function SideMenu() {
  return (
    <aside className="fixed bottom-32 right-3 z-10">
      <SideMenuRecentProduct />
      <SideMenuTopBtn />
    </aside>
  );
}
