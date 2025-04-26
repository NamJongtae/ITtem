import { useEffect } from "react";

export const useFocusing = (targetRef: React.RefObject<HTMLElement | null>) => {
  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.focus();
    }
  }, [targetRef]);
};
