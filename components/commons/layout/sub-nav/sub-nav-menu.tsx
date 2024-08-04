import SubNavMenuChatBtn from "./sub-nav-menu-chat-btn";
import SubNavMenuProductBtn from "./sub-nav-menu-product-btn";
import SubNavMenuNotificationBtn from "./sub-nav-menu-notification-btn";
import SubNavMenuSellBtn from "./sub-nav-menu-sell-btn";

export default function SubNavMenu() {
  return (
    <div className={"relative flex gap-3"}>
      <SubNavMenuNotificationBtn />
      <div className="hidden md:flex gap-3">
        <SubNavMenuChatBtn />
        <SubNavMenuSellBtn />
        <SubNavMenuProductBtn />
      </div>
    </div>
  );
}
