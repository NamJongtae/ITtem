import Image from "next/image";

export default function ProfileDetailFollowItemSkeletonUI() {
  return (
    <li className="animate-pulse mx-auto">
      <div className="flex gap-3 w-full">
        <Image
          className="w-[56px] h-[56px] rounded-full bg-gray-200"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          width={56}
          height={56}
          alt="loading..."
        />
        <div className="flex flex-col">
          <div className="h-[14px] bg-gray-300 mb-2"></div>
          <div className="h-[14px] w-28 bg-gray-300 mb-2"></div>
          <div className="h-[14px] bg-gray-300 mb-1"></div>
          <div className="h-[14px] w-20  bg-gray-300"></div>
        </div>
      </div>
      <div className="w-full max-w-[180px] mt-3 h-10 bg-gray-300"></div>
    </li>
  );
}
