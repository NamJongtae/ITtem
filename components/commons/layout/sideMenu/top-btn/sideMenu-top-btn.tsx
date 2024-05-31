import useScrollToTop from '@/hooks/layout/useScrollToTop';
import { usePathname } from "next/navigation";
import React from "react";

export default function SideMenuTopBtn() {
  const { handleClickTop } = useScrollToTop();
  const pathname = usePathname();

  if (pathname.includes("signin") || pathname.includes("signup")) {
    return null;
  }
  
  return (
    <button
      onClick={handleClickTop}
      className="bg-gray-700 text-white text-sm w-12 h-12 p-2 float-end"
    >
      TOP
    </button>
  );
}
