interface IProps {
  followersCount: number;
  followingsCount: number;
}

export default function FollowInfo({
  followersCount,
  followingsCount
}: IProps) {
  return (
    <div className="flex gap-5 text-sm font-medium">
      <p className="relative font-semibold before:absolute before:bg-gray-400 before:top-1/2 before:-translate-y-1/2 before:-right-[10px] before:w-[1px] before:h-7">
        <span>팔로워</span>
        <span className="block w-full text-center">{followersCount || 0}</span>
      </p>
      <p className="font-semibold">
        <span>팔로잉</span>
        <span className="block w-full text-center">{followingsCount || 0}</span>
      </p>
    </div>
  );
}
