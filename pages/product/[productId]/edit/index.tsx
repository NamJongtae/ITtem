import ProductUploadPage from "@/components/productUpload/product-upload-page";
import { queryKeys } from '@/queryKeys';
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";

export default function ProductEdit() {
  return <ProductUploadPage isEdit={true} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  const productId = context.params?.productId;
  const queryKeyConfing = queryKeys.product.detail(productId as string);

  if (productId) {
    await queryClient.prefetchQuery({
      queryKey: queryKeyConfing.queryKey,
      queryFn: queryKeyConfing.queryFn,
    });
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
