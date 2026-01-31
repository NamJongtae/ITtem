import SubNavMenu from "./SubNavMenu";
import SubNavCategory from "./SubNavCategory";

export default function SubNav() {
  return (
    <nav className="relative flex justify-between px-4 sm:px-8 pb-4 max-w-[1024px] mx-auto">
      <SubNavCategory />
      <SubNavMenu />
    </nav>
  );
}
