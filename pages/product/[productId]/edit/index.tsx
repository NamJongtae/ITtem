import ProductUploadPage from "@/components/productUpload/product-upload-page";
import { getProduct } from "@/lib/api/product";
import { ProductData } from "@/types/productTypes";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";

export default function ProductEdit() {
  return <ProductUploadPage isEdit={true} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  const productId = context.params?.productId;

  await queryClient.prefetchQuery<ProductData, Error>({
    queryKey: ["product", productId],
    queryFn: async () => {
      const product = await getProduct(productId as string);
      return product;
    },
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
