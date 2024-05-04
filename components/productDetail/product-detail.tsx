import useProductQuery from "@/hooks/querys/useProductQuery";
import CategoryNav from "../commons/category/category-nav";
import PrductDateilContent from "./prduct-dateil-content";
import ProductDeatilDescrtion from "./product-deatil-descrtion";
import ProductDeatilSeller from "./product-deatil-seller";
import Loading from "../commons/loading";
import { isAxiosError } from "axios";
import ProductListEmpty from "../commons/Empty";

export default function ProductDetailPage() {
  const { productData, loadProductLoading, loadProductError } =
    useProductQuery();

  if (loadProductLoading) {
    return <Loading />;
  }

  if (loadProductError) {
    if (isAxiosError<{ message: string }>(loadProductError)) {
      return (
        <ProductListEmpty
          message={loadProductError.response?.data.message || ""}
        />
      );
    }
  }
  return (
    productData && (
      <>
        <div className="pt-8 pb-12">
          <div className="relative container mx-auto px-6 max-w-[1024px]">
            <CategoryNav className={"max-w-7xl mx-auto mb-5"} />
            <PrductDateilContent productData={productData} />
            <div className="container mt-16 flex flex-col xl:flex-row border-t-2 border-solid border-black justify-between gap-10 xl:gap-5 pt-10 mx-auto max-w-7xl">
              <ProductDeatilDescrtion description={productData?.description} />
              <ProductDeatilSeller uid={productData?.uid} />
            </div>
          </div>
        </div>
      </>
    )
  );
}
