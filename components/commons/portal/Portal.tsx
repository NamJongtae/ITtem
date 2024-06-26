import { useEffect, useState } from 'react';
import ReactDOM from "react-dom";

export default function Portal({ children }: { children: React.ReactNode }) {
  const [isCSR, setIsCSR] = useState<boolean>(false);

  useEffect(() => {
    setIsCSR(true);
  }, [])
  
  if (typeof window === 'undefined') return null;
  if (!isCSR) return null

  return ReactDOM.createPortal(
    <>{children}</>,
    document.getElementById("portal-root") as HTMLElement
  );
}
