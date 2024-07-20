import ProductUploadPage from "@/components/productUpload/product-upload-page";
import { BASE_URL } from "@/constants/constant";

export async function generateMetadata({
  params,
}: {
  params: { productId: string | undefined };
}) {
  const url = `${BASE_URL}/product/${params.productId}/edit`;
  const title = "ITtem | 상품수정";

  return {
    metadataBase: new URL(url),
    title,
    openGraph: {
      url,
      title,
    },
  };
}

export default function ProductEdit() {
  return <ProductUploadPage isEdit={true} />;
}
