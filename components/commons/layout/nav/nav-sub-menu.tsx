import NavChat from "./nav-chat";
import NavProduct from "./nav-product";
import NavNotification from "./nav-notification";
import NavSell from "./nav-sell";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function NavSubMenu() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [mouted, setMouted] = useState(false);

  useEffect(() => {
    setMouted(true);
  }, []);

  return (
    mouted && (
      <div className={`${!user && "invisible"} relative flex gap-3`}>
        <NavNotification />
        <div className="hidden md:flex gap-3">
          <NavChat />
          <NavSell />
          <NavProduct />
        </div>
      </div>
    )
  );
}
