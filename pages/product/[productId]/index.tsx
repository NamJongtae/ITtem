import ProductDetailPage from "@/components/productDetail/product-detail";
import { queryKeys } from "@/queryKeys";
import { incrementViewCount } from "@/lib/api/product";
import customAxios from "@/lib/customAxios";
import { sessionOptions } from "@/lib/server";
import { IronSessionData } from "@/types/apiTypes";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { getDynamicMetaData } from "@/lib/getDynamicMetaData";
import { ProductData } from "@/types/productTypes";
import { MetaData } from "@/types/metaDataTypes";
import DynamicMetaHead from "@/components/dynamicMetaHead/dynamic-meta-head";

interface IProps {
  metaData: MetaData;
}

export default function ProductDetail({ metaData }: IProps) {
  return (
    <>
      <DynamicMetaHead {...metaData} />
      <ProductDetailPage />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res, resolvedUrl, params } = context;
  const queryClient = new QueryClient();
  const productId = params?.productId;
  const { getIronSession } = await import("iron-session");
  const session = await getIronSession<IronSessionData>(
    req,
    res,
    sessionOptions
  );
  const cookie = req.headers.cookie;
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

  const productData = queryClient.getQueryData(
    productQueryKeyConfing.queryKey
  ) as ProductData | undefined;

  const metaData = getDynamicMetaData({
    url: resolvedUrl,
    title: `상품-${productData?.name || ""}`,
  });

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
    props: { dehydratedState: dehydrate(queryClient), metaData },
  };
};
