export const calculateReviewStar = ({
  totalReviewScore,
  totalReviewCount
}: {
  totalReviewScore: number;
  totalReviewCount: number;
}) => {
  const reviewStar =
    (totalReviewScore || 0) > 0 && (totalReviewCount || 0) > 0
      ? (totalReviewScore || 0) / (totalReviewCount || 0)
      : 0;

  return reviewStar;
};
