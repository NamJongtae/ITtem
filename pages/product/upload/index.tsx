import DynamicMetaHead from "@/components/dynamicMetaHead/dynamic-meta-head";
import ProductUploadPage from "@/components/productUpload/product-upload-page";
import { getDynamicMetaDataURL } from "@/lib/getDynamicMetaData";

export default function ProductUpload() {
  return (
    <>
      <DynamicMetaHead title="상품 판매" url={getDynamicMetaDataURL("product/upload")} />
      <ProductUploadPage isEdit={false} />
    </>
  );
}
