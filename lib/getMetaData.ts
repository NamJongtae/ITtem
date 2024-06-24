import { getMetadataParams } from '@/types/metaDataTypes';

export const getMetaData = ({
  url,
  description,
  title,
  image,
}: getMetadataParams) => {
  const metaData = {
    url: getMetaDataURL(url),
    title,
    description: description ?? null,
    image: image ?? null,
  };

  return metaData;
};

export const getMetaDataURL = (pathname: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL}/${pathname}`;
};
