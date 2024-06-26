import { getMetadataParams } from '@/types/metaDataTypes';

export const getDynamicMetaData = ({
  url,
  description,
  title,
  image,
}: getMetadataParams) => {
  const metaData = {
    url: getDynamicMetaDataURL(url),
    title,
    description: description ?? null,
    image: image ?? null,
  };

  return metaData;
};

export const getDynamicMetaDataURL = (pathname: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL}/${pathname}`;
};
