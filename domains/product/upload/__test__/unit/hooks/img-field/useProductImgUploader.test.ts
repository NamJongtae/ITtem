import { renderHook, act } from "@testing-library/react";
import { useProductImgUploader } from "@/domains/product/upload/hooks/img-field/useProductImgUploader";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import { imgValidation } from "@/shared/common/utils/imgValidation";

jest.mock("react-hook-form");
jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));
jest.mock("@/shared/common/utils/imgValidation");

describe("useProductImgUploader 훅 테스트", () => {
  const mockSetValue = jest.fn();
  const mockGetValues = jest.fn();

  const mockImgValidation = imgValidation as jest.Mock;
  const mockAddPreview = jest.fn();

  const mockFile = (name: string) =>
    new File(["dummy content"], name, { type: "image/png" });

  beforeEach(() => {
    jest.clearAllMocks();

    (useFormContext as jest.Mock).mockReturnValue({
      getValues: mockGetValues,
      setValue: mockSetValue
    });

    mockImgValidation.mockImplementation(() => true); // 기본: 유효한 이미지
    global.URL.createObjectURL = jest.fn(() => "mocked-url");
  });

  it("중복된 파일은 업로드되지 않고 toast.warn이 호출됩니다.", () => {
    const file = mockFile("이미지.png");

    mockGetValues.mockReturnValue([mockFile("이미지.png")]);

    const { result } = renderHook(() =>
      useProductImgUploader(
        [{ name: "이미지.png", url: "url" }],
        mockAddPreview
      )
    );

    act(() => {
      result.current.uploadFiles({
        length: 1,
        0: file,
        item: () => file
      } as unknown as FileList);
    });

    expect(toast.warn).toHaveBeenCalledWith(
      "이미지.png은(는) 이미 업로드된 이미지입니다."
    );
    expect(mockSetValue).not.toHaveBeenCalled();
    expect(mockAddPreview).not.toHaveBeenCalled();
  });

  it("5개 초과 업로드 시 업로드되지 않고 toast.warn이 호출됩니다.", () => {
    const files = Array.from({ length: 3 }, (_, i) =>
      mockFile(`이미지${i}.png`)
    );

    mockGetValues.mockReturnValue([]);

    const { result } = renderHook(() =>
      useProductImgUploader(
        [
          { name: "1.png", url: "a" },
          { name: "2.png", url: "b" },
          { name: "3.png", url: "c" }
        ],
        mockAddPreview
      )
    );

    act(() => {
      result.current.uploadFiles({
        length: 3,
        0: files[0],
        1: files[1],
        2: files[2],
        item: (i: number) => files[i]
      } as unknown as FileList);
    });

    expect(toast.warn).toHaveBeenCalledWith(
      "최대 5개의 이미지까지 업로드 가능합니다."
    );
    expect(mockSetValue).not.toHaveBeenCalled();
    expect(mockAddPreview).not.toHaveBeenCalled();
  });

  it("정상적인 파일 업로드 시 setValue와 addPreview가 호출됩니다.", () => {
    const files = [mockFile("new.png")];

    mockGetValues.mockReturnValue([]);

    const { result } = renderHook(() =>
      useProductImgUploader([], mockAddPreview)
    );

    act(() => {
      result.current.uploadFiles({
        length: 1,
        0: files[0],
        item: (i: number) => files[i]
      } as unknown as FileList);
    });

    expect(mockSetValue).toHaveBeenCalledWith(
      "imgData",
      expect.arrayContaining([expect.objectContaining({ name: "new.png" })]),
      { shouldDirty: true, shouldValidate: true }
    );

    expect(mockAddPreview).toHaveBeenCalledWith([
      expect.objectContaining({ name: "new.png", url: expect.any(String) })
    ]);
  });

  it("imgValidation 실패 시 해당 파일은 무시됩니다.", () => {
    const file = mockFile("invalid.png");

    mockImgValidation.mockImplementation(() => false); // 유효하지 않은 파일
    mockGetValues.mockReturnValue([]);

    const { result } = renderHook(() =>
      useProductImgUploader([], mockAddPreview)
    );

    act(() => {
      result.current.uploadFiles({
        length: 1,
        0: file,
        item: () => file
      } as unknown as FileList);
    });

    expect(mockSetValue).not.toHaveBeenCalled();
    expect(mockAddPreview).not.toHaveBeenCalled();
    expect(toast.warn).not.toHaveBeenCalled();
  });
});
