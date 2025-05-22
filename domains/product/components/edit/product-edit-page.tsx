import React from "react";
import ProductUploadHeader from '../upload/product-upload-header';
import ProductEditForm from "./product-edit-form";

export default function ProductEditPage() {
  return (
    <div className="mx-auto pt-8 pb-12 max-w-6xl px-5 xl:px-0">
      <ProductUploadHeader isEdit={true} />
      <ProductEditForm />
    </div>
  );
}
