"use client";

import useAuth from "@/domains/auth/shared/common/hooks/useAuth";
import NavAvata from "./NavAvata";
import LogoutBtn from "./LogoutBtn";
import SigninBtn from "./SigninBtn";

export default function NavAuth() {
  const { user, authIsLoading } = useAuth();
  const isLoginUser = user?.uid;

  if (authIsLoading)
    return <div className="w-[36px] md:w-[192px] lg:w-[246px]"></div>;

  return (
    <div className="flex items-center gap-3 flex-shrink-0 md:basis-1/4 justify-end">
      {isLoginUser ? (
        <div className="flex items-center gap-3 w-full justify-end">
          <NavAvata user={user} />
          <LogoutBtn />
        </div>
      ) : (
        <SigninBtn />
      )}
    </div>
  );
}
