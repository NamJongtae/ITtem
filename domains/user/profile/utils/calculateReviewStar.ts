export default function calculateReviewStar({
  totalReviewScore,
  totalReviewCount
}: {
  totalReviewScore: number;
  totalReviewCount: number;
}) {
  if (
    typeof totalReviewScore !== "number" ||
    typeof totalReviewCount !== "number"
  ) {
    throw Error("올바른 타입이 제공되지 않아 리뷰 점수 계산에 실패했습니다.");
  }
  const reviewStar =
    (totalReviewScore || 0) > 0 && (totalReviewCount || 0) > 0
      ? (totalReviewScore || 0) / (totalReviewCount || 0)
      : 0;

  return reviewStar;
}
