import Link from "next/link";
import NavAvata from "./nav-avata";
import NavLogoutBtn from "./nav-logout-btn";
import NavSearchBar from "./nav-searchbar";
import SubNav from "./sub-nav";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import NavSigninBtn from "./nav-signin-btn";

export default function Nav() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  return (
    <>
      <nav className="max-w-[1024px] mx-auto pt-2 px-4 sm:px-8 text-sm">
        <div className="relative flex items-center justify-between h-16">
          <h1 className="text-xl md:text-2xl font-bold mr-4 flex-shrink-0">
            <Link className="flex items-center gap-2" href="/">
              <Image
                src={"/icons/logo.svg"}
                alt="잇템"
                width={32}
                height={32}
              />
              잇템
            </Link>
          </h1>

          <NavSearchBar />

          <div className="flex items-center gap-3 flex-shrink-0 md:basis-1/4 justify-end">
            {user ? (
              <div className="flex items-center gap-3 w-full justify-end">
                <NavAvata />
                <NavLogoutBtn />
              </div>
            ) : isLoading ? null : (
              <NavSigninBtn />
            )}
          </div>
        </div>
      </nav>
      <SubNav />
    </>
  );
}
