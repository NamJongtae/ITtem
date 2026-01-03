import ProductUploadHeader from "../../upload/components/ProductUploadHeader";
import ProductEditForm from "./Form";

export default function ProductEditPage() {
  return (
    <div className="mx-auto pt-8 pb-12 max-w-6xl px-5 xl:px-0">
      <ProductUploadHeader isEdit={true} />
      <ProductEditForm />
    </div>
  );
}
