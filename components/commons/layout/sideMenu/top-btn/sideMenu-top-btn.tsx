import useScrollToTop from "@/hooks/commons/layout/useScrollToTop";

export default function SideMenuTopBtn() {
  const { handleClickTop } = useScrollToTop();

  return (
    <button
      onClick={handleClickTop}
      className="bg-gray-700 text-white text-sm w-12 h-12 p-2 float-end"
    >
      TOP
    </button>
  );
}
