import { useCallback, useEffect, useState } from "react";
import useDebouncing from '../commons/useDebouncing';

export default function useSliderSkeletonUILogic() {
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [gap, setGap] = useState(30);
  const debounce = useDebouncing();

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

  useEffect(() => {
    updateLayout();

    const handleResize = () => {
      debounce(updateLayout, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [debounce, updateLayout]);

  return { slidesToShow, gap };
}
