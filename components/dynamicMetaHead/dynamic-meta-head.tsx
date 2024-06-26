import Head from "next/head";

interface IProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}
export default function DynamicMetaHead({ title, description, url, image }: IProps) {
  return (
    <Head>
      {title && (
        <>
          <title>{"ITtem | " + title}</title>
          <meta name="title" property="og:title" content={"ITtem | " + title} />
        </>
      )}

      {url && <meta name="url" property="og:url" content={url} />}

      {image && <meta name="image" property="og:image" content={image} />}

      {description && <meta name="description" content={description} />}
    </Head>
  );
}
