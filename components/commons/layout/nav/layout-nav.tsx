import Link from "next/link";
import LayoutNavSearchBar from "./layout-nav-search-bar";
import SubNav from "../sub-nav/sub-nav";
import Image from "next/image";
import LayoutNavAuth from "./layout-nav-auth";

export default function LayoutNav() {
  return (
    <>
      <nav className="max-w-[1024px] mx-auto pt-2 px-4 sm:px-8 text-sm">
        <div className="relative flex items-center justify-between h-16">
          <h1 className="text-xl md:text-2xl font-bold mr-4 flex-shrink-0">
            <Link className="flex items-center gap-2" href="/">
              <Image src={"/icons/logo.svg"} alt="" width={32} height={32} />
              잇템
            </Link>
          </h1>

          <LayoutNavSearchBar />

          <LayoutNavAuth />
        </div>
      </nav>
      <SubNav />
    </>
  );
}
