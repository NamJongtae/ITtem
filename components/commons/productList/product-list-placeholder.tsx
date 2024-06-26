import Image from "next/image";

interface IProps {
  listCount?: number;
}

export default function ProductListPlaceholder({ listCount = 10 }: IProps) {
  return Array(listCount)
    .fill("")
    .map((_, index) => (
      <li
        key={index}
        className="w-full h-full mx-auto rounded shadow-lg animate-pulse border max-w-xs"
      >
        <div className="mx-auto group flex w-full h-full flex-col overflow-hidden">
          <div className="w-full h-full bg-gray-300">
            <Image
              src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              width={300}
              height={300}
              alt="loading..."
            />
          </div>
          <div className="px-[10px] py-[15px]">
            <div className="h-[14px] bg-gray-300 mb-2"></div>
            <div className="h-[14px] bg-gray-300 w-2/3 mb-2"></div>
            <div className="flex justify-between">
              <div className="w-20 h-3 bg-gray-300"></div>
              <div className="w-12 h-3 bg-gray-300"></div>
            </div>
          </div>
        </div>
      </li>
    ));
}
