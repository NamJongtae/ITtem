import calculateReviewStar from "../../../utils/calculateReviewStar";

describe("calculateReviewStar 함수 테스트", () => {
  it("전체 리뷰 점수와 전체 리뷰 수를 주면 평균 별점을 계산합니다.", () => {
    const result = calculateReviewStar({
      totalReviewScore: 45,
      totalReviewCount: 10
    });
    expect(result).toBe(4.5);
  });

  it("전체 리뷰 점수는 있고 전체 리뷰 수가 0이면 0을 반환합니다.", () => {
    const result = calculateReviewStar({
      totalReviewScore: 45,
      totalReviewCount: 0
    });
    expect(result).toBe(0);
  });

  it("전체 리뷰 수가 있고 전체 리뷰 점수는 0이면 0을 반환합니다.", () => {
    const result = calculateReviewStar({
      totalReviewScore: 0,
      totalReviewCount: 5
    });
    expect(result).toBe(0);
  });

  it("전체 리뷰 수, 전체 리뷰 수가 둘 다 0이면 0을 반환합니다.", () => {
    const result = calculateReviewStar({
      totalReviewScore: 0,
      totalReviewCount: 0
    });
    expect(result).toBe(0);
  });

  it("totalReviewScore가 숫자가 아니면 에러를 thorow합니다.", () => {
    expect(() =>
      calculateReviewStar({
        totalReviewScore: "0" as unknown as number,
        totalReviewCount: 5
      })
    ).toThrow("올바른 타입이 제공되지 않아 리뷰 점수 계산에 실패했습니다.");
  });

  it("totalReviewCount가 숫자가 아니면 에러를 throw합니다.", () => {
    expect(() =>
      calculateReviewStar({
        totalReviewScore: 10,
        totalReviewCount: null as unknown as number
      })
    ).toThrow("올바른 타입이 제공되지 않아 리뷰 점수 계산에 실패했습니다.");
  });
});
