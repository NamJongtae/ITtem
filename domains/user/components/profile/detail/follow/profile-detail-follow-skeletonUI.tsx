import ProfileDetailFollowItemSkeletonUI from "./profile-detail-follow-item-skeletonUI";

interface IProps {
  listCount?: number;
}
export default function ProfileDetailFollowSkeletonUI({
  listCount = 10
}: IProps) {
  return (
    <div className="animate-plus">
      <ul className="grid gap-8 grid-cols-autoFill_180">
        {Array(listCount)
          .fill("")
          .map((_, index) => (
            <ProfileDetailFollowItemSkeletonUI key={index} />
          ))}
      </ul>
    </div>
  );
}
