"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children }: { children: React.ReactNode }) {
  const [isCSR, setIsCSR] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsCSR(true);
  }, []);

  if (typeof window === "undefined") return null;
  if (!isCSR) return null;

  return createPortal(
    <>{children}</>,
    document.getElementById("portal-root") as HTMLElement
  );
}
