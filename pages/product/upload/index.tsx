import MetaHead from "@/components/metaHead/meta-head";
import ProductUploadPage from "@/components/productUpload/product-upload-page";
import { getMetaDataURL } from "@/lib/getMetaData";

export default function ProductUpload() {
  return (
    <>
      <MetaHead title="상품 판매" url={getMetaDataURL("product/upload")} />
      <ProductUploadPage isEdit={false} />
    </>
  );
}
