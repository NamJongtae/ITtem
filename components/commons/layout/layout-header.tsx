import Nav from './nav/layout-nav';

export default function LayoutHeader() {
  return (
    <div className="fixed w-full z-20 mx-auto flex justify-center items-center">
      <header className="relative z-10 bg-white border-b w-full">
        <Nav />
      </header>
    </div>
  );
}
