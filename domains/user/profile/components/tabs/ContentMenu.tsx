// ContentMenu.tsx
import type { ProfileMenu } from "../../types/profileTypes";
import type { ProfileTab } from "./ProfileTabs";

interface Props {
  tabs: readonly ProfileTab[];
  activeKey: ProfileMenu;
  onChange: (menu: ProfileMenu) => void;
}

export default function ContentMenu({ tabs, activeKey, onChange }: Props) {
  return (
    <ul className="flex justify-between w-full h-full font-medium text-sm md:text-base">
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;

        return (
          <li
            key={tab.key}
            className={`${
              isActive ? "bg-gray-700 text-white" : ""
            } border border-b-black w-full h-full py-3 text-center`}
          >
            <button type="button" onClick={() => onChange(tab.key)}>
              {tab.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
