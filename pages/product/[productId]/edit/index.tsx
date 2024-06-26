import DynamicMetaHead from "@/components/dynamicMetaHead/dynamic-meta-head";
import ProductUploadPage from "@/components/productUpload/product-upload-page";
import { REFRESH_TOKEN_KEY } from "@/constants/constant";
import { getDynamicMetaData } from "@/lib/getDynamicMetaData";
import { sessionOptions } from "@/lib/server";
import { verifyToken } from "@/lib/token";
import { queryKeys } from "@/queryKeys";
import { IronSessionData } from "@/types/apiTypes";
import { MetaData } from "@/types/metaDataTypes";
import { ProductDetailData } from "@/types/productTypes";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getIronSession } from "iron-session";
import { GetServerSidePropsContext } from "next";

interface IProps {
  metaData: MetaData;
}

export default function ProductEdit({ metaData }: IProps) {
  return (
    <>
      <DynamicMetaHead {...metaData} />
      <ProductUploadPage isEdit={true} />
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const { query, resolvedUrl } = ctx;
  console.log("resolvedUrl:", resolvedUrl);
  const session = await getIronSession<IronSessionData>(
    ctx.req,
    ctx.res,
    sessionOptions
  );

  if (session.refreshToken) {
    const refreshToken = session.refreshToken;
    const decodeToken = verifyToken(refreshToken, REFRESH_TOKEN_KEY);
    const myUid = decodeToken?.data?.user.uid;

    const productId = ctx.query?.productId;
    await queryClient.prefetchQuery({
      queryKey: queryKeys.product.detail(productId as string).queryKey,
      queryFn: queryKeys.product.detail(productId as string).queryFn,
    });
    const productData = queryClient.getQueryData(
      queryKeys.product.detail(productId as string).queryKey
    ) as ProductDetailData | undefined;

    const metaData = getDynamicMetaData({
      url: resolvedUrl,
      title: `상품-수정-${productData?.name || ""}`,
    });

    if (myUid === productData?.auth.uid) {
      return {
        props: {
          dehydratedState: dehydrate(queryClient),
          metaData,
        },
      };
    } else {
      return {
        redirect: {
          destination: "/product",
          permanent: false,
        },
      };
    }
  }
}
