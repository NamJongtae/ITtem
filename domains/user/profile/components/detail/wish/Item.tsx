import getProductDateFormat from "@/domains/product/shared/utils/getProductDateFormat";
import { ProductData } from "@/domains/product/shared/types/productTypes";
import Image from "next/image";
import Link from "next/link";
import CheckIcon from "@/public/icons/check-icon.svg";
import { WishlistProductData } from "../../../types/profileTypes";

interface IProps {
  wishProduct: WishlistProductData;
  onClickCheckBox: (id: string) => void;
  selectedWish: string[];
}

export default function Item({
  wishProduct,
  onClickCheckBox,
  selectedWish
}: IProps) {
  return (
    <li key={wishProduct._id} className="relative flex border rounded-md">
      <Link href={`/product/${wishProduct._id}`}>
        <Image
          className="w-32 h-32 border-r"
          src={wishProduct.imgData[0].url}
          alt={wishProduct.name}
          width={128}
          height={128}
        />
      </Link>

      <div className="flex flex-col gap-2 px-4 py-2">
        <span className="text-sm font-medium line-clamp-1">
          {wishProduct.name}
        </span>
        <span>
          <span className="text-sm font-semibold">
            {wishProduct.price.toLocaleString()}
          </span>
          원
        </span>
        <div className="flex gap-1 items-center">
          <Image
            src={"/icons/location-icon.svg"}
            alt={wishProduct.location}
            width={12}
            height={12}
          />
          <span className="text-sm line-clamp-1">{wishProduct?.location}</span>
        </div>
        <time className="text-xs text-gray-500">
          {getProductDateFormat(wishProduct?.createdAt?.toString() || "")}
        </time>
      </div>

      <div className="absolute top-0 right-0 inline-flex items-center">
        <label
          className="relative flex cursor-pointer items-center rounded-full p-3"
          htmlFor="wish-delete-checkbox"
          data-wishproduct-ripple-dark="true"
        >
          <input
            type="checkbox"
            className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-blue-gray-200 transition-all checked:border-red-400 checked:bg-red-400"
            id="wish-delete-checkbox"
            onChange={() => onClickCheckBox(wishProduct._id)}
            checked={selectedWish.includes(wishProduct._id)}
          />
          <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
            <CheckIcon className="fill-white" />
          </div>
        </label>
      </div>
    </li>
  );
}
