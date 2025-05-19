import ProfileDetailWishItemSkeltonUI from "./profile-detail-wish-item-skeletonUI";

export default function ProfileDetailWishSkeletonUI() {
  return (
    <>
      <div className="w-20 h-6 bg-gray-300 mb-5" />
      <ul className="grid grid-col-1 md:grid-cols-2 gap-3">
        {Array(8)
          .fill("")
          .map((_, index) => (
            <ProfileDetailWishItemSkeltonUI key={index} />
          ))}
        ;
      </ul>
    </>
  );
}
