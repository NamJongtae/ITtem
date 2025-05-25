import Image from "next/image";

interface IProps {
  listCount?: number;
}

export default function ListSkeletonUI({
  listCount = 10,
}: IProps) {
  return Array(listCount)
    .fill("")
    .map((_, index) => (
      <li
        key={index}
        className="animate-pulse flex gap-3 flex-col sm:flex-row sm:items-center sm:justify-between border-b py-5 "
      >
        <div className="flex gap-3 items-center">
          <Image
            className="w-32 h-32 object-cover object-center bg-gray-200"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            width={56}
            height={56}
            alt="loading..."
          />
          <div className="flex flex-col gap-2 text-sm">
            <div className="h-[14px] w-40 bg-gray-300 mb-2"></div>
            <div className="h-[14px] w-40 bg-gray-300 mb-2"></div>
            <div className="h-[14px] w-40 bg-gray-300 mb-2"></div>
            <div className="h-[14px] w-40 bg-gray-300 mb-2"></div>
          </div>
        </div>

        <div className="flex flex-row justify-end sm:flex-col gap-3">
          <button className="bg-gray-300 w-[91px] h-[40px]"></button>
          <button className="bg-gray-300 w-[91px] h-[40px]"></button>
        </div>
      </li>
    ));
}
