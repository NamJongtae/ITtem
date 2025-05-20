import { useCallback, useEffect, useState } from "react";
import { useThrottle } from "../commons/useThrottle";

const getInitialLayout = () => {
  if (typeof window === "undefined") return { slidesToShow: 4, gap: 30 };

  const width = window.innerWidth;
  if (width < 540) return { slidesToShow: 1, gap: 10 };
  if (width < 768) return { slidesToShow: 2, gap: 20 };
  if (width < 1024) return { slidesToShow: 3, gap: 30 };
  return { slidesToShow: 4, gap: 30 };
};

export default function useSliderSkeletonUILogic() {
  const initial = getInitialLayout();
  const [slidesToShow, setSlidesToShow] = useState(initial.slidesToShow);
  const [gap, setGap] = useState(initial.gap);

  const updateLayout = useCallback(() => {
    const width = window.innerWidth;

    if (width < 540) {
      setSlidesToShow(1);
      setGap(10);
    } else if (width < 768) {
      setSlidesToShow(2);
      setGap(20);
    } else if (width < 1024) {
      setSlidesToShow(3);
      setGap(30);
    } else {
      setSlidesToShow(4);
      setGap(30);
    }
  }, []);

  const throttledUpdateLayout = useThrottle(updateLayout, 100);

  useEffect(() => {
    throttledUpdateLayout();

    window.addEventListener("resize", throttledUpdateLayout);
    return () => window.removeEventListener("resize", throttledUpdateLayout);
  }, [throttledUpdateLayout]);

  return { slidesToShow, gap };
}
