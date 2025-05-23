"use client";

import useAuth from "@/domains/auth/hooks/useAuth";
import LayoutNavAvata from "./layout-nav-avata";
import LayoutNavLogoutBtn from "./layout-nav-logout-btn";
import LayoutNavSigninBtn from "./layout-nav-signin-btn";

export default function LayoutNavAuth() {
  const { user, authIsLoading } = useAuth();
  const isLoginUser = user?.uid;

  if (authIsLoading)
    return <div className="w-[36px] md:w-[192px] lg:w-[246px]"></div>;

  return (
    <div className="flex items-center gap-3 flex-shrink-0 md:basis-1/4 justify-end">
      {isLoginUser ? (
        <div className="flex items-center gap-3 w-full justify-end">
          <LayoutNavAvata />
          <LayoutNavLogoutBtn />
        </div>
      ) : (
        <LayoutNavSigninBtn />
      )}
    </div>
  );
}
