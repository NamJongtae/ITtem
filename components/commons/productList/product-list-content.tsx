import { getDateFormat } from "@/lib/getDateFormate";
import { ProductData } from "@/types/productTypes";

interface IProps {
  data: Pick<ProductData, "name" | "createdAt">;
}

export default function ProductListContent({ data }: IProps) {
  return (
    <div className="px-[15px] py-[10px]">
      <h5 className="tracking-tight text-gray-500 line-clamp-1 text-sm">
        {data.name}
      </h5>
      <p>
        <span className="text-sm font-bold text-gray-900">10,000</span>
        <span className="text-xs ml-[2px] font-extrabold">원</span>
        <span className="block float-right text-xs text-gray-500 pt-1">
          {getDateFormat(data.createdAt)}
        </span>
      </p>
    </div>
  );
}
