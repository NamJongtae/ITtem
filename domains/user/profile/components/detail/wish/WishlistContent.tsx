import SuspenseErrorBoundary from "@/shared/common/components/SuspenseErrorBoundary";
import List from "./List";
import SkeletonUI from "./SkeletonUI";
import Empty from "@/shared/common/components/Empty";

interface IProps {
  wishCount: number | undefined;
}

export default function WishlistContent({ wishCount }: IProps) {
  return (
    <div className="mt-8 mb-8">
      <h2 className="font-semibold border-b pb-3 mb-3">
        찜 {wishCount || 0}개
      </h2>

      {!wishCount || wishCount === 0 ? (
        <Empty message={"찜 목록이 없어요."} />
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
          <List />
        </SuspenseErrorBoundary>
      )}
    </div>
  );
}
