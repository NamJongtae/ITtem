import dynamic from "next/dynamic";

const Nav = dynamic(() => import("./nav/layout-nav"), {
  ssr: false,
});

export default function Header() {
  return (
    <div className="fixed w-full z-20 mx-auto flex justify-center items-center">
      <header className="relative z-10 bg-white border-b w-full">
        <Nav />
      </header>
    </div>
  );
}
