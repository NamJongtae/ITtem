import NavSubMenu from "./nav-sub-menu";
import MenuIcon from "@/public/icons/menu_icon.svg";
import NavCategoryMenu from "./nav-category-menu";
import useNavCategory from "@/hooks/commons/layout/useNavCategory";

export default function SubNav() {
  const {
    isOpenCategory,
    toggleCategory,
    categoryRef,
    buttonRef,
    currentCategory,
  } = useNavCategory();

  return (
    <nav className="relative flex justify-between px-4 sm:px-8 pb-4 max-w-[1024px] mx-auto">
      <div className="flex gap-3 items-center">
        <button onClick={toggleCategory} ref={buttonRef}>
          <MenuIcon
            className={`w-6 h-6 ${
              isOpenCategory ? "fill-red-400" : "fill-black"
            }`}
          />
        </button>
        {isOpenCategory && (
          <NavCategoryMenu
            currentCategory={currentCategory}
            ref={categoryRef}
          />
        )}
      </div>
      <NavSubMenu />
    </nav>
  );
}
