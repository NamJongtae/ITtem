import { queryKeys } from "@/queryKeys";
import { incrementViewCount } from "@/lib/api/product";
import customAxios from "@/lib/customAxios";
import { sessionOptions } from "@/lib/server";
import { IronSessionData } from "@/types/apiTypes";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getDynamicMetaData } from "@/lib/getDynamicMetaData";
import { ProductData } from "@/types/productTypes";
import { MetaData } from "@/types/metaDataTypes";
import DynamicMetaHead from "@/components/dynamicMetaHead/dynamic-meta-head";
import dynamic from "next/dynamic";
import { withAuthServerSideProps } from "@/lib/withAuthServerSideProps";
const ProductDetailPage = dynamic(
  () => import("@/components/productDetail/product-detail")
);

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

export const getServerSideProps = withAuthServerSideProps(async (context) => {
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
});
