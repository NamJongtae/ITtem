import { getDateFormat } from "@/lib/getDateFormate";
import { ProductData } from "@/types/productTypes";

interface IProps {
  data: Pick<ProductData, "name" | "createdAt" | "price" | "location">;
}

export default function ProductListContent({ data }: IProps) {
  return (
    <div className="px-[15px] py-[10px]">
      <h5 className="tracking-tight text-gray-500 line-clamp-1 text-sm">
        {data.name}
      </h5>
      <p>
        <span className="text-sm font-bold text-gray-900">
          {data.price.toLocaleString()}
        </span>
        <span className="text-xs ml-[2px] font-extrabold">원</span>
      </p>
      <div className="mt-1 text-xs text-gray-500 flex justify-between gap-3">
        <span className="truncate">{data.location}</span>
        <span className="shrink-0">
          {getDateFormat(data.createdAt as string)}
        </span>
      </div>
    </div>
  );
}
