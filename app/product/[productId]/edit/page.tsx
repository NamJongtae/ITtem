import ProductUploadPage from '@/components/product-upload/product-upload-page';
import { BASE_URL } from "@/constants/constant";

export async function generateMetadata({
  params
}: {
  params: Promise<{ productId: string | undefined }>;
}) {
  const { productId } = await params;
  const url = `${BASE_URL}/product/${productId}/edit`;
  const title = "ITtem | 상품수정";

  return {
    metadataBase: new URL(url),
    title,
    openGraph: {
      url,
      title
    }
  };
}

export default function ProductEdit() {
  return <ProductUploadPage isEdit={true} />;
}
