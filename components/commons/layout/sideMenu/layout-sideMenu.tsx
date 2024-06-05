import dynamic from "next/dynamic";
import SideMenuTopBtn from "./top-btn/sideMenu-top-btn";
import { useRouter } from "next/router";

const SideMenuRecentProduct = dynamic(
  import("./recent-product/sideMenu-recentProduct"),
  {
    ssr: false,
  }
);

export default function SideMenu() {
  const router = useRouter();
  const pathname = router.pathname;
  if (
    pathname.includes("chat") ||
    pathname.includes("signup") ||
    pathname.includes("signin")
  ) {
    return null;
  }

  return (
    <aside className="fixed bottom-32 right-3 z-10">
      <SideMenuRecentProduct />
      <SideMenuTopBtn />
    </aside>
  );
}
