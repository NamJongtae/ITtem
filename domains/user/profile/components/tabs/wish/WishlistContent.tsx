import SuspenseErrorBoundary from "@/shared/common/components/SuspenseErrorBoundary";
import WishList from "./WishList";
import SkeletonUI from "./WishListSkeletonUI";
import Empty from "@/shared/common/components/Empty";

interface IProps {
  wishCount: number | undefined;
}

export default function WishlistContent({ wishCount }: IProps) {
  const count = wishCount ?? 0;

  return (
    <div className="mt-8 mb-8">
      <h2 className="font-semibold border-b pb-3 mb-3">찜 {count}개</h2>

      {count === 0 ? (
        <Empty message="찜한 상품이 없어요." />
      ) : (
        <SuspenseErrorBoundary
          suspenseFallback={<SkeletonUI />}
          errorFallback={
            <Empty
              message={
                "찜 목록을 불러올 수 없어요.\n잠시 후 다시 시도해주세요."
              }
            />
          }
        >
          <WishList />
        </SuspenseErrorBoundary>
      )}
    </div>
  );
}
