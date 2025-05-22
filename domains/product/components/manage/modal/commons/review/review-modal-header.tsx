import { isMobile } from "react-device-detect";

export default function ReviewModalHeader() {
  return (
    <h2
      className={`${
        isMobile ? "mt-10" : "mt-3"
      } text-xl text-center font-semibold mb-3`}
    >
      리뷰
    </h2>
  );
}
