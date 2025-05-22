import SuspenseErrorBoundary from "@/components/suspense-error-boundary";
import ProfileDetailWishList from "./profile-detail-wish-list";
import ProfileDetailWishSkeletonUI from "./profile-detail-wish-skeletonUI";
import Empty from "@/components/empty";

interface IProps {
  wishProductIds: string[] | undefined;
}

export default function ProfileDetailWish({ wishProductIds }: IProps) {
  return (
    <div className="mt-8 mb-8">
      <h2 className="font-semibold border-b pb-3 mb-3">
        찜 {wishProductIds?.length || 0}개
      </h2>

      {wishProductIds?.length === 0 ? (
        <Empty message={"찜 목록이 없어요."} />
      ) : (
        <SuspenseErrorBoundary
          suspenseFallback={<ProfileDetailWishSkeletonUI />}
          errorFallback={
            <Empty
              message={
                "찜 목록을 불러올 수 없어요.\n잠시 후 다시 시도해주세요."
              }
            />
          }
        >
          <ProfileDetailWishList wishProductIds={wishProductIds} />
        </SuspenseErrorBoundary>
      )}
    </div>
  );
}
