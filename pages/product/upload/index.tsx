import DynamicMetaHead from "@/components/dynamicMetaHead/dynamic-meta-head";
import { getDynamicMetaDataURL } from "@/lib/getDynamicMetaData";
import dynamic from "next/dynamic";
const ProductUploadPage = dynamic(
  () => import("@/components/productUpload/product-upload-page")
);

export default function ProductUpload() {
  return (
    <>
      <DynamicMetaHead
        title="상품 판매"
        url={getDynamicMetaDataURL("product/upload")}
      />
      <ProductUploadPage isEdit={false} />
    </>
  );
}
