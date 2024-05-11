import { getDateFormat } from "@/lib/getDateFormate";
import { ProductData } from "@/types/productTypes";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  wishList: (ProductData & {
    isChecked: boolean;
  })[];
  handleCheckWish: (id: string) => void;
}

export default function ProfileDetailWishList({
  wishList,
  handleCheckWish,
}: IProps) {
  return (
    <ul className="grid grid-col-1 md:grid-cols-2 gap-3">
      {wishList.map((data) => (
        <li key={data._id} className="relative flex border">
          <Link href={`/product/${data._id}`}>
            <Image
              className="w-32 h-32 border-r"
              src={data.imgData[0].url}
              alt={data.name}
              width={128}
              height={128}
            />
          </Link>

          <div className="flex flex-col gap-2 px-4 py-2">
            <span className="text-sm font-medium line-clamp-1">
              {data.name}
            </span>
            <span>
              <span className="text-sm font-semibold">20,000</span>원
            </span>
            <div className="flex gap-1 items-center">
              <Image
                src={"/icons/location_icon.svg"}
                alt={data.location}
                width={12}
                height={12}
              />
              <span className="text-sm line-clamp-1">{data.location}</span>
            </div>
            <time className="text-xs text-gray-500">
              {getDateFormat(data.createdAt?.toString() || "")}
            </time>
          </div>

          <div className="absolute top-0 right-0 inline-flex items-center">
            <label
              className="relative flex cursor-pointer items-center rounded-full p-3"
              htmlFor="wish"
              data-ripple-dark="true"
            >
              <input
                type="checkbox"
                className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all checked:border-red-400 checked:bg-red-400"
                id="wish"
                onChange={() => handleCheckWish(data._id)}
                checked={data.isChecked}
              />
              <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
}
