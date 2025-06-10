import { renderHook, act } from "@testing-library/react";
import useWishDeleteHandler from "../../../hooks/useWishDeleteHandler";
import useDeleteProfileWishMutate from "../../../hooks/mutations/useDeleteProfileWishMutate";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

jest.mock("../../../hooks/mutations/useDeleteProfileWishMutate");

describe("useWishDeleteHandler 훅 테스트", () => {
  const deleteWishMutateMock = jest.fn();

  beforeEach(() => {
    (useDeleteProfileWishMutate as jest.Mock).mockReturnValue({
      deleteWishMutate: deleteWishMutateMock
    });
    jest.clearAllMocks();
  });

  it("삭제할 찜 목록이 선택 되지않으면 toast.warn를 호출합니다.", () => {
    const { result } = renderHook(() => useWishDeleteHandler([]));

    act(() => {
      result.current.onClickDelete();
    });

    expect(toast.warn).toHaveBeenCalledWith("삭제 할 목록이 없어요.");
    expect(deleteWishMutateMock).not.toHaveBeenCalled();
  });

  it("onClickDelete 호출 시 confirm이 true인 경우 deleteWishMutate을 호출합니다.", () => {
    window.confirm = () => true;

    const selectedWish = ["wish1", "wish2"];
    const { result } = renderHook(() => useWishDeleteHandler(selectedWish));

    act(() => {
      result.current.onClickDelete();
    });

    expect(deleteWishMutateMock).toHaveBeenCalledWith(selectedWish);
  });

  it("onClickDelete 호출 시 confirm이 false인 경우 deleteWishMutate을 호출하지 않습니다.", () => {
    window.confirm = () => false;

    const selectedWish = ["wish1"];
    const { result } = renderHook(() => useWishDeleteHandler(selectedWish));

    act(() => {
      result.current.onClickDelete();
    });

    expect(deleteWishMutateMock).not.toHaveBeenCalled();
  });

  it("찜 목록 삭제 후 체크박스를 해제합니다.", () => {
    window.confirm = () => true;

    const selectedWish = ["wish1"];
    const { result } = renderHook(() => useWishDeleteHandler(selectedWish));

    const mockCheckbox = { checked: true };
    result.current.allCheckBoxInputRef.current =
      mockCheckbox as HTMLInputElement;

    act(() => {
      result.current.onClickDelete();
    });

    expect(mockCheckbox.checked).toBe(false);
  });
});
