import { renderHook, act } from "@testing-library/react";
import useImgDragAndDrop from '@/domains/product/upload/hooks/img-field/useImgDragAndDrop';

describe("useImgDragAndDrop 훅 테스트", () => {
  const mockHandleDropImgUpload = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("handleDragStart를 호출하면 isActive는 true가 됩니다.", () => {
    const { result } = renderHook(() =>
      useImgDragAndDrop(mockHandleDropImgUpload)
    );

    act(() => {
      result.current.handleDragStart();
    });

    expect(result.current.isActive).toBe(true);
  });

  it("handleDragEnd를 호출하면 isActive는 false가 됩니다.", () => {
    const { result } = renderHook(() =>
      useImgDragAndDrop(mockHandleDropImgUpload)
    );

    act(() => {
      result.current.handleDragStart(); // 먼저 true로 만들고
      result.current.handleDragEnd(); // 다시 false로 전환
    });

    expect(result.current.isActive).toBe(false);
  });

  it("handleDragOver는 e.preventDefault를 호출됩니다.", () => {
    const { result } = renderHook(() =>
      useImgDragAndDrop(mockHandleDropImgUpload)
    );

    const mockEvent = {
      preventDefault: jest.fn()
    } as unknown as React.DragEvent<HTMLButtonElement>;

    act(() => {
      result.current.handleDragOver(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it("handleDrop 호출 시 handleDropImgUpload도 호출되고 isActive는 false가 됩니다.", () => {
    const { result } = renderHook(() =>
      useImgDragAndDrop(mockHandleDropImgUpload)
    );

    const mockEvent = {} as React.DragEvent<HTMLButtonElement>;

    act(() => {
      result.current.handleDragStart(); // 활성화 시킨 후
      result.current.handleDrop(mockEvent);
    });

    expect(mockHandleDropImgUpload).toHaveBeenCalledWith(mockEvent);
    expect(result.current.isActive).toBe(false);
  });
});
