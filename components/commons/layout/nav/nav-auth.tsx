"use client";

import useAuth from "@/hooks/commons/layout/useAuth";
import NavAvata from "./nav-avata";
import NavLogoutBtn from "./nav-logout-btn";
import NavSigninBtn from "./nav-signin-btn";

export default function NavAuth() {
  const { user, authIsLoading } = useAuth();

  return (
    <div className="flex items-center gap-3 flex-shrink-0 md:basis-1/4 justify-end">
      {user?.uid ? (
        <div className="flex items-center gap-3 w-full justify-end">
          <NavAvata />
          <NavLogoutBtn />
        </div>
      ) : authIsLoading ? null : (
        <NavSigninBtn />
      )}
    </div>
  );
}
