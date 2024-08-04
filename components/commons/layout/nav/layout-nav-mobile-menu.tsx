import useNavMobileMenu from "@/hooks/commons/layout/useNavMobileMenu";
import { forwardRef } from "react";

interface IProps {
  toggleMenu: () => void;
}

const LayoutNavMobileMenu = forwardRef<HTMLUListElement, IProps>(
  ({ toggleMenu }: IProps, ref) => {
    const { user, handleClicksignin, handleClickSignout } = useNavMobileMenu({
      toggleMenu,
    });

    return (
      <>
        <div
          onClick={toggleMenu}
          className="fixed z-20 inset-0 bg-black bg-opacity-50"
          role="back-drop"
        ></div>
        <ul
          className="fixed rounded-tl-md rounded-tr-md bottom-16 bg-white w-full px-2 pt-3 pb-3 md:hidden animate-slideUp z-20 before:absolute before:-translate-x-1/2 before:left-1/2 before:top-2 before:w-8 before:h-1 before:rounded-full before:bg-gray-500 before:content-['']"
          ref={ref}
        >
          <li>
            <button
              onClick={user ? handleClickSignout : handleClicksignin}
              className="mt-1 block px-3 py-2 rounded-md text-gray-800 font-semibold betterhover:hover:bg-gray-300 betterhover:hover:text-white  transition duration-150 ease-in-out w-full text-left"
              type="button"
            >
              {user ? "로그아웃" : "로그인"}
            </button>
          </li>
        </ul>
      </>
    );
  }
);

LayoutNavMobileMenu.displayName = "LayoutNavMobileMenu";

export default LayoutNavMobileMenu;
