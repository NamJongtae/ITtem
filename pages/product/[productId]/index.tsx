import ProductDetailPage from "@/components/productDetail/product-detail";
import { queryKeys } from "@/queryKeys";
import { getProduct, incrementViewCount } from "@/lib/api/product";
import customAxios from "@/lib/customAxios";
import { sessionOptions } from "@/lib/server";
import { IronSessionData } from "@/types/apiTypes";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getIronSession } from "iron-session";
import { GetServerSideProps } from "next";

export default function ProductDetail() {
  return <ProductDetailPage />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const productId = context.params?.productId;
  const session = await getIronSession<IronSessionData>(
    context.req,
    context.res,
    sessionOptions
  );
  const cookie = context.req.headers.cookie;
  const productQueryKeyConfing = queryKeys.product.detail(productId as string);
  const myProfuileQueryKeyConfig = queryKeys.profile.my;

  if (productId) {
    try {
      await incrementViewCount(productId as string);
    } catch (error) {
      console.error(error);
    }

    await queryClient.prefetchQuery({
      queryKey: productQueryKeyConfing.queryKey,
      queryFn: productQueryKeyConfing.queryFn,
    });
  }

  if (session.refreshToken) {
    await queryClient.prefetchQuery({
      queryKey: myProfuileQueryKeyConfig.queryKey,
      queryFn: async () => {
        try {
          const response = await customAxios("/api/profile", {
            headers: {
              Cookie: cookie,
            },
          });
          return response.data.profile;
        } catch (error) {
          queryClient.removeQueries({
            queryKey: myProfuileQueryKeyConfig.queryKey,
          });
          console.error(error);
        }
      },
    });
  }
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};
