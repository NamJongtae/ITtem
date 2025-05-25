import CancelBtn from "./CancelBtn";
import SubmitBtn from "./SubmitBtn";

export default function ProductUploadBtns() {
  return (
    <div className="flex gap-3 justify-end w-full mt-5">
      <CancelBtn />
      <SubmitBtn />
    </div>
  );
}
