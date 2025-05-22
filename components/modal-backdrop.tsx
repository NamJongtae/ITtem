"use client";

import { useRouter } from "next/navigation";

export default function ModalBackDrop() {
  const router = useRouter();
  const handleClickBackdrop = () => {
    router.back();
  };

  return (
    <div
      onClick={handleClickBackdrop}
      className="fixed bg-[#0B131E5E] inset-0"
      aria-label="back-drop"
    ></div>
  );
}
