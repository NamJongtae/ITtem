import Head from "next/head";

interface IProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}
export default function MetaHead({ title, description, url, image }: IProps) {
  return (
    <Head>
      <title>{title ? "ITtem | " + title : "ITtem"}</title>
      <meta
        property="og:title"
        content={title ? "ITtem | " + title : "ITtem"}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={url ? url : process.env.NEXT_PUBLIC_BASE_URL}
      />
      <meta property="og:image" content={image} />
      <meta property="og:article:author" content="ITtem" />
      <meta
        name="description"
        content={
          description ||
          "중고거래 플랫폼, 잇템. 안전하고 쉬운 중고거래, 다양한 상품과 빠른 거래를 경험하세요."
        }
      />
      <meta
        name="google-site-verification"
        content="c6hLQ83ILZIlJb0fwdyrw71DGHnTFaI7hmmORy7fpk0"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1"
      />
      <meta
        name="naver-site-verification"
        content="8a189164663805b9eeea137c43336f57fa7bdcf2"
      />
    </Head>
  );
}
