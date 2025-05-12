import ProductUploadForm from './product-upload-form';
import ProductUploadHeader from "./product-upload-header";

interface IProps {
  isEdit?: boolean;
}

export default function ProductUploadPage({ isEdit }: IProps) {
  return (
    <div className="mx-auto pt-8 pb-12 max-w-6xl px-5 xl:px-0">
      <ProductUploadHeader isEdit={isEdit} />
      <ProductUploadForm isEdit={isEdit} />
    </div>
  );
}
