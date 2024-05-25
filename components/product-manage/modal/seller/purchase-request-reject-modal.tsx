import usePurchaseRequestRejectMutate from "@/hooks/querys/usePurchaseRequestRejectMutate";
import ProductManageModal from "../product-manage-modal";
import { isMobile } from "react-device-detect";
import { FieldValues, useForm } from "react-hook-form";

interface IProps {
  productId: string;
  closeModal: () => void;
}

export default function PurchaseRequestRejectModal({
  productId,
  closeModal,
}: IProps) {
  const { register, handleSubmit, watch } = useForm({
    mode: "onChange",
    defaultValues: { rejectReason: "", rejectReasonText: "" },
  });

  const rejectReasonValue = watch("rejectReason");

  const { purchaseRequestRejectMutate } = usePurchaseRequestRejectMutate();

  const onSubmit = (values: FieldValues) => {
    const rejectReason: string =
      values.rejectReason === "직접입력"
        ? values.rejectReasonText
        : values.rejectReason;

    purchaseRequestRejectMutate({ productId, rejectReason });
  };

  return (
    <ProductManageModal closeModal={closeModal}>
      <form
        onSubmit={handleSubmit((values) => {
          onSubmit(values);
        })}
      >
        <div
          className={`${
            isMobile ? "h-screen center" : "max-w-[480px] center"
          } fixed z-30 flex flex-col justify-center gap-3 w-full p-8 border bg-white`}
        >
          <h2 className="text-xl text-center font-semibold mb-5">
            상품 구매 요청 거절
          </h2>
          <select
            {...register("rejectReason", {
              required: rejectReasonValue !== "직접입력",
            })}
            className="border rounded-md px-2 py-1"
          >
            <option value={""}>거절사유 선택</option>
            <option value={"상품을 잘못 등록"}>상품을 잘못 등록</option>
            <option value={"상품에 이상이 생김"}>상품에 이상이 생김</option>
            <option value={"상품 오류"}>상품 오류</option>
            <option value={"직접입력"}>직접입력</option>
          </select>
          <label className="sr-only" htmlFor="rejectReason">
            거절사유 직접입력
          </label>
          <textarea
            className="root_input resize-none mt-3"
            rows={6}
            {...register("rejectReasonText", {
              required: rejectReasonValue === "직접입력",
            })}
            id="introduce"
            placeholder="직접입력"
            maxLength={300}
            disabled={rejectReasonValue !== "직접입력"}
          />
          <div className="flex justify-end gap-3 mt-5">
            <button
              type="submit"
              className="py-2 px-4 bg-[#66a2fb] text-white font-medium betterhover:hover:bg-[#3c87f8] disabled:opacity-50"
            >
              구매요청거절
            </button>
            <button
              type="button"
              onClick={closeModal}
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
