import NavChat from "./nav-chat";
import NavProduct from "./nav-product";
import NavNotification from "./nav-notification";
import NavSell from "./nav-sell";

export default function NavSubMenu() {
  return (
    <div className={"relative flex gap-3"}>
      <NavNotification />
      <div className="hidden md:flex gap-3">
        <NavChat />
        <NavSell />
        <NavProduct />
      </div>
    </div>
  );
}
