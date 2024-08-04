"use client";

import useAuth from "@/hooks/commons/layout/useAuth";
import LayoutNavAvata from "./layout-nav-avata";
import LayoutNavLogoutBtn from "./layout-nav-logout-btn";
import LayoutNavSigninBtn from "./layout-nav-signin-btn";

export default function LayoutNavAuth() {
  const { user, authIsLoading } = useAuth();

  return (
    <div className="flex items-center gap-3 flex-shrink-0 md:basis-1/4 justify-end">
      {user?.uid ? (
        <div className="flex items-center gap-3 w-full justify-end">
          <LayoutNavAvata />
          <LayoutNavLogoutBtn />
        </div>
      ) : authIsLoading ? null : (
        <LayoutNavSigninBtn />
      )}
    </div>
  );
}
