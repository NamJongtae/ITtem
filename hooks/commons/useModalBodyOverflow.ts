import { useEffect } from "react";

export default function useModalBodyOverflow({
  isModal
}: {
  isModal?: boolean;
}) {
  useEffect(() => {
    if (isModal) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModal]);
}
