import NavChat from "./nav-chat";
import NavSell from "./nav-sell";
import NavMyProduct from "./nav-product";
import NavHome from "./nav-home";
import NavMobileMenu from "./nav-mobile-menu";
import useMoblieNavMenu from "@/hooks/useMoblieNavMenu";
import NavMoblieMenuBtn from "./nav-moblie-menuBtn";
import { useRouter } from "next/router";
export default function MobileNav() {
  const { isOpenMenu, toggleMenu, menuRef } = useMoblieNavMenu();
  const router = useRouter();
  const pathname = router.pathname;

  if (
    pathname.includes("/signup") ||
    pathname.includes("/signin") ||
    pathname.includes("/findpassword")
  ) {
    return null;
  }

  return (
    <>
      <nav className="z-30 md:hidden fixed bottom-0 w-full h-16 p-2 bg-white shadow-[0_-2px_4px_0_rgba(33,37,41,.08)]">
        <ul className="flex justify-evenly items-center h-full w-full">
          <li>
            <NavChat />
          </li>
          <li>
            <NavSell />
          </li>
          <li>
            <NavHome />
          </li>
          <li>
            <NavMyProduct />
          </li>
          <li>
            <NavMoblieMenuBtn isOpenMenu={isOpenMenu} toggleMenu={toggleMenu} />
          </li>
        </ul>
      </nav>

      {isOpenMenu && <NavMobileMenu toggleMenu={toggleMenu} ref={menuRef} />}
    </>
  );
}
