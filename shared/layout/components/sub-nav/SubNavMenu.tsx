import MenuChatBtn from "./ChatBtn";
import MenuProductBtn from "./ProductBtn";
import NotificationBtn from "@/shared/layout/components/sub-nav/NotificationBtn";
import MenuSellBtn from "./SellBtn";

export default function SubNavMenu() {
  return (
    <div className={"relative flex gap-3"}>
      <NotificationBtn />
      <div className="hidden md:flex gap-3">
        <MenuChatBtn />
        <MenuSellBtn />
        <MenuProductBtn />
      </div>
    </div>
  );
}
