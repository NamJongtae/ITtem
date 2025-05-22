import { useEffect } from "react";

export default function useBodyOverflow({
  isLocked
}: {
  isLocked?: boolean;
}) {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLocked]);
}
