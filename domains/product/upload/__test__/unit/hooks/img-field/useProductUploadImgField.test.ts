import { renderHook, act } from "@testing-library/react";
import useProductUploadImgField from "@/domains/product/upload/hooks/img-field/useProductUploadImgField";
import useModal from "@/shared/common/hooks/useModal";
import { useProductImgUploader } from "@/domains/product/upload/hooks/img-field/useProductImgUploader";
import { useProductUploadImgPreview } from "@/domains/product/upload/hooks/img-field/useProductUploadImgPreview";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: { warn: jest.fn() }
}));
jest.mock("@/shared/common/hooks/useModal");
jest.mock(
  "@/domains/product/upload/hooks/img-field/useProductUploadImgPreview"
);
jest.mock("@/domains/product/upload/hooks/img-field/useProductImgUploader");

describe("useProductUploadImgField 훅 테스트", () => {
  const mockUploadFiles = jest.fn();
  const mockAddPreview = jest.fn();
  const mockRemovePreview = jest.fn();
  const mockOpenModal = jest.fn();
  const mockCloseModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useModal as jest.Mock).mockReturnValue({
      isOpenModal: false,
      openModal: mockOpenModal,
      handleClickCloseBtn: mockCloseModal
    });

    (useProductUploadImgPreview as jest.Mock).mockReturnValue({
      preview: [],
      addPreview: mockAddPreview,
      removePreview: mockRemovePreview
    });

    (useProductImgUploader as jest.Mock).mockReturnValue({
      uploadFiles: mockUploadFiles
    });
  });

  it("handleOnChangeImg가 호출되면 uploadFiles가 호출됩니다.", () => {
    const file = new File(["dummy"], "test.png", { type: "image/png" });
    const fileList = {
      length: 1,
      0: file,
      item: () => file
    } as unknown as FileList;

    const { result } = renderHook(() => useProductUploadImgField());

    act(() => {
      result.current.handleOnChangeImg({
        target: { files: fileList }
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(mockUploadFiles).toHaveBeenCalledWith(fileList);
  });

  it("handleDropImgUpload가 호출되면 uploadFiles가 호출됩니다.", () => {
    const files = {
      length: 1,
      0: new File(["dummy"], "drop.png", { type: "image/png" }),
      item: () => null
    } as unknown as FileList;

    const { result } = renderHook(() => useProductUploadImgField());

    const mockPreventDefault = jest.fn();

    act(() => {
      result.current.handleDropImgUpload({
        preventDefault: mockPreventDefault,
        dataTransfer: { files }
      } as unknown as React.DragEvent<HTMLButtonElement>);
    });

    expect(mockPreventDefault).toHaveBeenCalled();
    expect(mockUploadFiles).toHaveBeenCalledWith(files);
  });

  it("handleClickImgInput이 호출되면 ref 클릭이 실행됩니다.", () => {
    const clickMock = jest.fn();

    const { result } = renderHook(() => useProductUploadImgField());

    // ref 수동 할당
    if (result.current.imgInputRef.current) {
      result.current.imgInputRef.current.click = clickMock;
    } else {
      (result.current.imgInputRef as any).current = { click: clickMock };
    }

    act(() => {
      result.current.handleClickImgInput();
    });

    expect(clickMock).toHaveBeenCalled();
  });

  it("preview가 없으면 handleOpenModal에서 toast.warn이 호출됩니다.", () => {
    const { result } = renderHook(() => useProductUploadImgField());

    act(() => {
      result.current.handleOpenModal();
    });

    expect(toast.warn).toHaveBeenCalledWith("이미지가 존재하지 않습니다.");
    expect(mockOpenModal).not.toHaveBeenCalled();
  });

  it("preview가 있으면 handleOpenModal에서 모달이 열립니다.", () => {
    (useProductUploadImgPreview as jest.Mock).mockReturnValue({
      preview: [{ name: "a", url: "url" }],
      addPreview: mockAddPreview,
      removePreview: mockRemovePreview
    });

    const { result } = renderHook(() => useProductUploadImgField());

    act(() => {
      result.current.handleOpenModal();
    });

    expect(toast.warn).not.toHaveBeenCalled();
    expect(mockOpenModal).toHaveBeenCalled();
  });
});
