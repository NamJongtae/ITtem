import SuspenseErrorBoundary from "@/shared/common/components/SuspenseErrorBoundary";
import PageContainer from "@/domains/product/edit/components/PageContainer";
import { BASE_URL } from "@/shared/common/constants/constant";
import ProductUploadLoading from "../../upload/loading";
import Empty from "@/shared/common/components/Empty";

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

export default async function ProductEdit({
  params
}: {
  params: Promise<{ productId: string | undefined }>;
}) {
  const { productId } = await params;
  return (
    <SuspenseErrorBoundary
      suspenseFallback={<ProductUploadLoading isEdit={true} />}
      errorFallback={
        <Empty message="상품 데이터를 불러올 수 없어요.\n잠시 후 다시 시도해주세요." />
      }
    >
      <PageContainer productId={productId} />
    </SuspenseErrorBoundary>
  );
}
