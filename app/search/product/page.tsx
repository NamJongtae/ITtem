import SearchPage from "@/domains/search/components/SearchPage";
import { BASE_URL } from "@/shared/common/constants/constant";

export async function generateMetadata({
  searchParams
}: {
  searchParams: Promise<{
    category: string | undefined;
    keyword: string | undefined;
  }>;
}) {
  const { category, keyword } = await searchParams;
  const url = `${BASE_URL}/search/product/?keyword=${keyword}`;
  const title = keyword
    ? `ITtem | 상품검색-${keyword}-${category || "전체"}`
    : `ITtem | 상품-${category || "전체"}`;

  return {
    metadataBase: new URL(url),
    title,
    openGraph: {
      url,
      title
    }
  };
}

export default function Search() {
  return <SearchPage />;
}
