export interface MetaData {
  title?: string;
  url?: string;
  image?: string;
  description?: string;
}

export interface getMetadataParams {
  url: string;
  title: string;
  description?: string;
  image?: string;
}
