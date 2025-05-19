import ProductUploadFieldSkeletonUI from '@/components/product-upload/product-upload-field-skeletonUI';

interface IProps {
  isEdit: boolean;
}

export default function ProductUploadLoading({ isEdit }: IProps) {
  return (
    <div className="mx-auto pt-8 pb-12 max-w-6xl px-5 xl:px-0">
      {/* 제목 */}
      <div className="font-bold text-xl border-b-2 pb-3 border-b-gray-600 flex items-center">
        {isEdit ? "상품수정" : "상품등록"}
        <div className="text-red-500 text-sm ml-5">*필수입력</div>
      </div>

      <ProductUploadFieldSkeletonUI />
    </div>
  );
}
