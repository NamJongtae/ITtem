interface IParams {
  totalReviewScore: number | undefined;
  totalReviewCount: number | undefined;
}

export default function useProfileDetailReviewInfo({
  totalReviewScore,
  totalReviewCount,
}: IParams) {
  const reviewStar =
    (totalReviewScore || 0) > 0 && (totalReviewCount || 0) > 0
      ? (totalReviewScore || 0) / (totalReviewCount || 0)
      : 0;

  return { reviewStar };
}
