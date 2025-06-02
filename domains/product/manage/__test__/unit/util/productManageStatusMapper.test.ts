import {
  productStatusEncoder,
  productStatusParser
} from "../../../utils/productManageStatusMapper";

describe("productStatusParser - 모든 상태를 올바르게 파싱해야 합니다.", () => {
  it('TRADING → "거래중"', () => {
    expect(productStatusParser["TRADING"]).toBe("거래중");
  });

  it('TRADING_END → "거래완료 내역"', () => {
    expect(productStatusParser["TRADING_END"]).toBe("거래완료 내역");
  });

  it('"CANCEL_END/RETURN_END" → "취소/반품 내역"', () => {
    expect(productStatusParser["CANCEL_END/RETURN_END"]).toBe("취소/반품 내역");
  });

  it('"CANCEL_REJECT/RETURN_REJECT" → "취소/반품 거절 내역"', () => {
    expect(productStatusParser["CANCEL_REJECT/RETURN_REJECT"]).toBe(
      "취소/반품 거절 내역"
    );
  });
});

describe("productStatusEncoder - 모든 상태를 올바르게 인코딩해야 합니다.", () => {
  it('"거래중" → TRADING', () => {
    expect(productStatusEncoder["거래중"]).toBe("TRADING");
  });

  it('"거래완료 내역" → TRADING_END', () => {
    expect(productStatusEncoder["거래완료 내역"]).toBe("TRADING_END");
  });

  it('"취소/반품 내역" → CANCEL_END/RETURN_END', () => {
    expect(productStatusEncoder["취소/반품 내역"]).toBe(
      "CANCEL_END/RETURN_END"
    );
  });

  it('"취소/반품 거절 내역" → CANCEL_REJECT/RETURN_REJECT', () => {
    expect(productStatusEncoder["취소/반품 거절 내역"]).toBe(
      "CANCEL_REJECT/RETURN_REJECT"
    );
  });
});

describe("양방향 매핑 테스트", () => {
  it("parser로 파싱한 값을 encoder로 다시 원래 키로 되돌릴 수 있어야 합니다.", () => {
    for (const queryKey in productStatusParser) {
      const parsed =
        productStatusParser[queryKey as keyof typeof productStatusParser];
      const reEncoded = productStatusEncoder[parsed];
      expect(reEncoded).toBe(queryKey);
    }
  });

  it("encoder로 인코딩한 값을 parser로 다시 원래 상태로 되돌릴 수 있어야 합니다.", () => {
    for (const statusKey in productStatusEncoder) {
      const encoded =
        productStatusEncoder[statusKey as keyof typeof productStatusEncoder];
      const reParsed = productStatusParser[encoded];
      expect(reParsed).toBe(statusKey);
    }
  });
});
