import ProductUploadPage from "@/components/productUpload/product-upload-page";
import { getProductQueryKey } from "@/constants/constant";
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

  if (productId) {
    await queryClient.prefetchQuery<ProductData, Error>({
      queryKey: getProductQueryKey(productId as string),
      queryFn: async () => {
        const reponse = await getProduct(productId as string);
        return reponse.data.product;
      },
    });
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
