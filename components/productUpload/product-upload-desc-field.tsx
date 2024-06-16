import useProductUploadDescField from "@/hooks/productUpload/useProductUploadDescField";

export default function ProductUploadDescField() {
  const { register, productDesc, handleChangeProductDesc } =
    useProductUploadDescField();

  return (
    <div className="border-b py-8">
      <label className="sr-only" htmlFor="desc">
        설명
      </label>
      <h3 className="font-semibold text-lg">
        설명 <span className="text-red-500">*</span>
      </h3>
      <textarea
        className="p-4 resize-none rounded-sm border border-gray-400 w-full h-56 mt-5 scrollbar"
        placeholder={
          "구매시기, 브랜드/모델명 자세한 상품의 상태 등을 입력해주세요.\n허위/사기 매물 등록시 제제 및 형사 처벌을 받을 수 있습니다."
        }
        id="description"
        rows={6}
        {...register("description", {
          onChange: handleChangeProductDesc,
          maxLength: 1500,
          required: true,
        })}
      />
      <span className="block text-right mr-1">
        {productDesc?.length || 0}/1500
      </span>
    </div>
  );
}
