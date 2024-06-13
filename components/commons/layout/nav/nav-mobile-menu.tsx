import useSignoutMutate from "@/hooks/reactQuery/mutations/auth/useSignoutMutate";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";
import { useSelector } from "react-redux";

interface IProps {
  toggleMenu: () => void;
}

const NavMobileMenu = forwardRef<HTMLUListElement, IProps>(
  ({ toggleMenu }: IProps, ref) => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.user);
    const { signoutMutate } = useSignoutMutate();

    const handleClicksignin = () => {
      router.push("/signin");
      toggleMenu();
    };

    const handleClickSignout = () => {
      signoutMutate(undefined);
      toggleMenu();
    };

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

NavMobileMenu.displayName = "NavMobileMenu";

export default NavMobileMenu;
