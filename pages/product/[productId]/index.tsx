import ProductDetailPage from "@/components/productDetail/product-detail";
import { getProductQueryKey, getProfileQueryKey } from '@/constants/constant';
import { getUserProfile } from '@/lib/api/auth';
import { getProduct } from "@/lib/api/product";
import { ProductData } from "@/types/productTypes";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";

export default function ProductDetail() {
  return <ProductDetailPage />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const productId = context.params?.productId;

  if(productId) {
    await queryClient.prefetchQuery({
      queryKey: getProductQueryKey(productId as string),
      queryFn: async () => {
        const reponse = await getProduct(productId as string);
        return reponse.data.product;
      },
    });
  
    const productData = queryClient.getQueryData([
      "product",
      productId,
    ]) as ProductData;
  
    const uid = productData?.uid;
  
    if(uid) {
      await queryClient.prefetchQuery({
        queryKey: getProfileQueryKey(uid),
        queryFn: async () => {
          const profile = await getUserProfile(uid);
          return profile.data.profile;
        },
      });
    }
  }
  

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};
