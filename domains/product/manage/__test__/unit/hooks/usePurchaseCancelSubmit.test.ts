import { renderHook, act } from "@testing-library/react";
import usePurchaseCancelSubmit from "../../../hooks/usePurchaseCancelSubmit";
import usePurchaseCancelRequestMutate from "../../../hooks/mutations/usePurchaseCancelRequestMutate";

jest.mock("../../../hooks/mutations/usePurchaseCancelRequestMutate");

describe("usePurchaseCancelSubmit 훅 테스트", () => {
  const mutateMock = jest.fn();
  const closeModalMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (usePurchaseCancelRequestMutate as jest.Mock).mockReturnValue({
      purchaseCancelRequestMutate: mutateMock
    });
  });

  it("일반 취소 사유일 때 그대로 전달되는지 확인합니다.", () => {
    const { result } = renderHook(() =>
      usePurchaseCancelSubmit({
        closeModal: closeModalMock,
        productId: "product123"
      })
    );

    const formValues = {
      cancelReason: "단순 변심",
      cancelReasonText: ""
    };

    act(() => {
      result.current.onSubmit(formValues);
    });

    expect(mutateMock).toHaveBeenCalledWith({
      productId: "product123",
      cancelReason: "단순 변심"
    });

    expect(closeModalMock).toHaveBeenCalled();
  });

  it("직접입력일 경우 cancelReasonText가 사용되는지 확인합니다.", () => {
    const { result } = renderHook(() =>
      usePurchaseCancelSubmit({
        closeModal: closeModalMock,
        productId: "product123"
      })
    );

    const formValues = {
      cancelReason: "직접입력",
      cancelReasonText: "개인 사정으로 취소"
    };

    act(() => {
      result.current.onSubmit(formValues);
    });

    expect(mutateMock).toHaveBeenCalledWith({
      productId: "product123",
      cancelReason: "개인 사정으로 취소"
    });

    expect(closeModalMock).toHaveBeenCalled();
  });
});
