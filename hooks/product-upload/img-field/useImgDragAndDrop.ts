// hooks/useDragAndDrop.js 또는 적절한 경로에 파일 생성
import { useState } from "react";

const useImgDragAndDrop = (
  handleDropImgUpload: (e: React.DragEvent<HTMLButtonElement>) => void
) => {
  const [isActive, setActive] = useState(false);

  const handleDragStart = () => setActive(true);
  const handleDragEnd = () => setActive(false);
  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    handleDropImgUpload(e);
    setActive(false);
  };

  return {
    isActive,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop
  };
};

export default useImgDragAndDrop;
