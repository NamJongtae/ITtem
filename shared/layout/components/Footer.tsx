"use client";

import useVisible from "@/shared/common/hooks/useVisible";

export default function Footer() {
  const { isVisible } = useVisible({
    pathnames: ["signup", "signin", "findpassword"]
  });

  if (!isVisible) {
    return null;
  }

  return (
    <footer className="footer footer-center w-full p-4 bg-gray-300 text-gray-800 pb-[80px] md:pb-4">
      <div className="text-center">
        <p className="text-sm md:text-md">
          Copyright © 2024 -{" "}
          <span className="font-semibold italic text-gray-600">잇템</span>
        </p>
      </div>
    </footer>
  );
}
