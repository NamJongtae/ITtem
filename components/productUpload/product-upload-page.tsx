import ProductUploadHeader from "./product-upload-header";
import dynamic from "next/dynamic";

const ProductUploadForm = dynamic(() => import("./product-upload-form"), {
  ssr: false,
});

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
