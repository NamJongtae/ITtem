import Link from "next/link";
import SearchBar from "./SearchBar";
import Image from "next/image";
import NavAuth from "./NavAuth";
import { Suspense } from "react";
import SubNavClient from "./SubNavClient";

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

          <Suspense
            fallback={
              <div className="relative w-full max-w-[200px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] ml-auto mr-5 md:ml-0 md:mr-0 flex">
                <div className="w-full h-10 border-2 border-gray-300 bg-gray-200 animate-pulse" />
              </div>
            }
          >
            <SearchBar />
          </Suspense>

          <NavAuth />
        </div>
      </nav>

      <SubNavClient />
    </>
  );
}
