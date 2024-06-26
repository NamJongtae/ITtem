import NavAvata from "./nav-avata";
import NavLogoutBtn from "./nav-logout-btn";
import NavSigninBtn from "./nav-signin-btn";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useAuth from '@/hooks/commons/useAuth';

export default function NavAuth() {
  useAuth();
  
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  return (
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
  );
}
