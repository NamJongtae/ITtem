import Spinner from "@/shared/common/components/Spinner";

interface IProps {
  isMyProfile?: boolean;
}

export default function ProfileTabsSSRSkeletonUI({ isMyProfile }: IProps) {
  return (
    <div className="mt-5 max-w-[1024px] mx-auto px-4 md:px-8 animate-pulse">
      {/* 메뉴 */}
      <div className="flex justify-between w-full h-full font-medium text-sm md:text-base">
        {[...Array(isMyProfile ? 5 : 4)].map((_, i) => (
          <div
            key={i}
            className={`w-full h-12 border-b border-b-black pl-[1px]`}
          >
            <div className="w-full h-full bg-gray-300 animate-pulse" />
          </div>
        ))}
      </div>

      <div
        className="flex justify-center items-center w-full h-32"
      >
        <Spinner />
      </div>
    </div>
  );
}
