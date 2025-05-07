import { useCallback, useRef } from 'react';

export function useImgInputTrigger() {
  const imgInputRef = useRef<HTMLInputElement | null>(null);

  const handleClickImgInput = useCallback(() => {
    if (!imgInputRef.current) return;
    imgInputRef.current.click();
  }, []);

  return { imgInputRef, handleClickImgInput };
}
