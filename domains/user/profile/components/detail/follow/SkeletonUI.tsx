import ItemSkeletonUI from "./ItemSkeletonUI";

interface IProps {
  listCount?: number;
}
export default function FollowSkeletonUI({ listCount = 10 }: IProps) {
  return (
    <div className="animate-plus">
      <ul className="grid gap-8 grid-cols-autoFill_180">
        {Array(listCount)
          .fill("")
          .map((_, index) => (
            <ItemSkeletonUI key={index} />
          ))}
      </ul>
    </div>
  );
}
