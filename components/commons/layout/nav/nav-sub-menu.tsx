import NavChat from "./nav-chat";
import NavProduct from "./nav-product";
import NavNotification from "./nav-notification";
import NavSell from "./nav-sell";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function NavSubMenu() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className={`${!user && "invisible"} relative flex gap-3`}>
      <NavNotification />
      <div className="hidden md:flex gap-3">
        <NavChat />
        <NavSell />
        <NavProduct />
      </div>
    </div>
  );
}
