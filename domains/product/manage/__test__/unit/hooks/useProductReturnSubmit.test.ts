import { renderHook, act } from "@testing-library/react";
import useProductReturnSubmit from "../../../hooks/useProductReturnSubmit";
import useProductReturnRequestMutate from "../../../hooks/mutations/useProductReturnRequestMutate";

jest.mock("../../../hooks/mutations/useProductReturnRequestMutate");

describe("useProductReturnSubmit 훅 테스트", () => {
  const mutateMock = jest.fn();
  const closeModalMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useProductReturnRequestMutate as jest.Mock).mockReturnValue({
      productReturnRequestMutate: mutateMock
    });
  });

  it("일반 사유 선택 시 returnReason이 그대로 전달되는지 확인합니다.", () => {
    const { result } = renderHook(() =>
      useProductReturnSubmit({
        closeModal: closeModalMock,
        productId: "product-001"
      })
    );

    const formValues = {
      returnReason: "단순 변심",
      returnReasonText: ""
    };

    act(() => {
      result.current.onSubmit(formValues);
    });

    expect(mutateMock).toHaveBeenCalledWith({
      productId: "product-001",
      returnReason: "단순 변심"
    });

    expect(closeModalMock).toHaveBeenCalled();
  });

  it("사유가 '직접입력'인 경우 returnReasonText가 사용되는지 확인합니다.", () => {
    const { result } = renderHook(() =>
      useProductReturnSubmit({
        closeModal: closeModalMock,
        productId: "product123"
      })
    );

    const formValues = {
      returnReason: "직접입력",
      returnReasonText: "상품 파손"
    };

    act(() => {
      result.current.onSubmit(formValues);
    });

    expect(mutateMock).toHaveBeenCalledWith({
      productId: "product123",
      returnReason: "상품 파손"
    });

    expect(closeModalMock).toHaveBeenCalled();
  });
});
