import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.includes("/signup") || pathname.includes("/signin")) {
    return null;
  }
  return (
    <footer className="footer footer-center  w-full p-4 bg-gray-300 text-gray-800">
      <div className="text-center">
        <p className="text-sm md:text-md">
          Copyright © 2024 -{" "}
          <span className="font-semibold italic text-gray-600">잇템</span>
        </p>
      </div>
    </footer>
  );
}
