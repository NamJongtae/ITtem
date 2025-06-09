import { renderHook, act } from "@testing-library/react";
import { useProductUploadImgPreview } from "@/domains/product/upload/hooks/img-field/useProductUploadImgPreview";
import { useFormContext } from "react-hook-form";
import { ProductImgData } from "@/domains/product/shared/types/productTypes";

jest.mock("react-hook-form");

describe("useProductUploadImgPreview 훅 테스트", () => {
  const mockSetValue = jest.fn();
  const mockGetValues = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useFormContext as jest.Mock).mockReturnValue({
      setValue: mockSetValue,
      getValues: mockGetValues
    });
  });

  it("초기 이미지 배열을 preview로 설정합니다.", () => {
    const initial: ProductImgData[] = [
      { name: "img1.png", url: "url1" },
      { name: "img2.png", url: "url2" }
    ];

    const { result } = renderHook(() => useProductUploadImgPreview(initial));

    expect(result.current.preview).toEqual(initial);
  });

  it("addPreview를 호출하면 preview에 이미지가 추가됩니다.", () => {
    const initial: ProductImgData[] = [{ name: "img1.png", url: "url1" }];
    const newImage: ProductImgData = { name: "img2.png", url: "url2" };

    const { result } = renderHook(() => useProductUploadImgPreview(initial));

    act(() => {
      result.current.addPreview([newImage]);
    });

    expect(result.current.preview).toEqual([
      { name: "img1.png", url: "url1" },
      { name: "img2.png", url: "url2" }
    ]);
  });

  it("removePreview를 호출하면 해당 index의 preview와 form 값이 제거됩니다.", () => {
    const initial: ProductImgData[] = [
      { name: "img1.png", url: "url1" },
      { name: "img2.png", url: "url2" },
      { name: "img3.png", url: "url3" }
    ];

    const mockImgData = [
      new File(["dummy"], "img1.png"),
      new File(["dummy"], "img2.png"),
      new File(["dummy"], "img3.png")
    ];

    const mockPrevImgData = [...initial];

    mockGetValues.mockImplementation((key: string) => {
      if (key === "imgData") return mockImgData;
      if (key === "prevImgData") return mockPrevImgData;
      return [];
    });

    const { result } = renderHook(() => useProductUploadImgPreview(initial));

    act(() => {
      result.current.removePreview(1); // 중간 이미지 제거
    });

    expect(result.current.preview).toEqual([
      { name: "img1.png", url: "url1" },
      { name: "img3.png", url: "url3" }
    ]);

    expect(mockSetValue).toHaveBeenCalledWith(
      "imgData",
      [mockImgData[0], mockImgData[2]],
      { shouldDirty: true, shouldValidate: true }
    );

    expect(mockSetValue).toHaveBeenCalledWith(
      "prevImgData",
      [mockPrevImgData[0], mockPrevImgData[2]],
      { shouldDirty: true, shouldValidate: true }
    );
  });
});
