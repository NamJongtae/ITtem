import ProductManageModal from "../product-manage-modal";
import useReturnRejectMutate from "@/hooks/querys/useReturnReceiptReject.Mutate";
import { isMobile } from "react-device-detect";
import { FieldValues, useForm } from "react-hook-form";

interface IProps {
  productId: string;
  closeModal: () => void;
}

export default function ProductReturnRejectModal({
  productId,
  closeModal,
}: IProps) {
  const { register, handleSubmit, watch } = useForm({
    mode: "onChange",
    defaultValues: { rejectReason: "", rejectReasonText: "" },
  });

  const rejectReasonValue = watch("rejectReason");

  const { returnRejectMutate } = useReturnRejectMutate();

  const onSubmit = (values: FieldValues) => {
    const rejectReason: string =
      values.rejectReason === "직접입력"
        ? values.rejectReasonText
        : values.rejectReason;

    returnRejectMutate({ productId, rejectReason });
  };

  return (
    <ProductManageModal closeModal={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`${
            isMobile ? "h-screen center" : "max-w-[480px] center"
          } fixed z-30 flex flex-col justify-center gap-3 w-full p-8 border bg-white`}
        >
          <h2 className="text-xl text-center font-semibold mb-5">
            상품 반품 거절
          </h2>
          <select
            className="border rounded-md px-2 py-1"
            {...register("rejectReason", {
              required: rejectReasonValue !== "직접입력",
            })}
          >
            <option value={""}>거절사유 선택</option>
            <option value={"구매자 파손 상품"}>구매자 파손 상품</option>
            <option value={"직접입력"}>직접입력</option>
          </select>
          <label className="sr-only" htmlFor="rejectReason">
            거절사유 직접입력
          </label>
          <textarea
            className="root_input resize-none mt-3"
            {...register("rejectReasonText", {
              required: rejectReasonValue === "직접입력",
            })}
            rows={6}
            id="rejectReason"
            placeholder="직접입력"
            maxLength={300}
          />
          <div className="flex justify-end gap-3">
            <button
              type="submit"
              className="py-2 px-4 bg-[#66a2fb] text-white font-medium betterhover:hover:bg-[#3c87f8] disabled:opacity-50"
            >
              반품거절
            </button>
            <button
              type="button"
              className="py-2 px-4 bg-gray-400 text-white font-medium betterhover:hover:bg-gray-600"
            >
              취소하기
            </button>
          </div>
        </div>
      </form>
    </ProductManageModal>
  );
}
