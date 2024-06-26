import Head from "next/head";

export default function DefaultHead() {
  return (
    <Head>
      <title>{"ITtem"}</title>
      <meta name="title" property="og:title" content={"ITtem"} />
      <meta name="type" property="og:type" content="website" />
      <meta name="image" property="og:image" content={"/icons/images/og_img"} />
      <meta name="author" property="og:article:author" content="ITtem" />
      <meta
        name="description"
        content={
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
      <link rel="icon" href="/icons/logo.svg" />
    </Head>
  );
}
