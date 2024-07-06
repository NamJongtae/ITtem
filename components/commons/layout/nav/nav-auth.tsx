import NavAvata from "./nav-avata";
import NavLogoutBtn from "./nav-logout-btn";
import NavSigninBtn from "./nav-signin-btn";
import useNavAuth from "@/hooks/commons/layout/useNavAuth";

export default function NavAuth() {
  const { user } = useNavAuth();

  return (
    <div className="flex items-center gap-3 flex-shrink-0 md:basis-1/4 justify-end">
      {user ? (
        <div className="flex items-center gap-3 w-full justify-end">
          <NavAvata />
          <NavLogoutBtn />
        </div>
      ) : (
        <NavSigninBtn />
      )}
    </div>
  );
}
