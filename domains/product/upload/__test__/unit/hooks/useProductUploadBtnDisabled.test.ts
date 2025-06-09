import { renderHook, act } from "@testing-library/react";
import useProductUploadBtnDisabled from "../../../hooks/useProductUploadBtnDisabled";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";

jest.mock("next/navigation");

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn()
}));

describe("useProductUploadBtnDisabled 훅 테스트", () => {
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;
  const mockUseFormContext = useFormContext as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({ push: mockPush });
  });

  it("에러 없고 모든 필드가 dirty, hasImgDataChanged 없는 경우 isDisabled는 false입니다.", () => {
    mockUseFormContext.mockReturnValue({
      getValues: jest
        .fn()
        .mockImplementation((key: "prevImgData" | "imgData") => {
          const mockData = {
            prevImgData: [{ name: "img1" }],
            imgData: [{ name: "img1" }]
          };
          return mockData[key];
        }),
      formState: {
        errors: {},
        dirtyFields: {
          name: true,
          price: true,
          sellType: true,
          category: true,
          location: true,
          condition: true,
          returnPolicy: true,
          transaction: true,
          deliveryFee: true,
          description: true,
          imgData: true
        }
      }
    });

    const { result } = renderHook(() => useProductUploadBtnDisabled(false));

    expect(result.current.isDisabled).toBe(false);
  });

  it("hasImgDataChanged가 false인 경우 isDisabled는 true입니다.", () => {
    mockUseFormContext.mockReturnValue({
      getValues: jest
        .fn()
        .mockImplementation((key: "prevImgData" | "imgData") => {
          const mockData = {
            prevImgData: [{ name: "img1" }],
            imgData: [{ name: "img1" }]
          };
          return mockData[key];
        }),
      hasImgDataChanged: false,
      formState: {
        errors: {},
        dirtyFields: {
          name: true,
          price: true,
          sellType: true,
          category: true,
          location: true,
          condition: true,
          returnPolicy: true,
          transaction: true,
          deliveryFee: true,
          description: true,
          imgData: true
        }
      }
    });

    const { result } = renderHook(() => useProductUploadBtnDisabled(true));

    expect(result.current.isDisabled).toBe(false);
  });

  it("에러 존재 시 isDisabled는 true입니다.", () => {
    mockUseFormContext.mockReturnValue({
      getValues: jest.fn(),
      formState: {
        errors: {
          name: { message: "이름 필수" }
        },
        dirtyFields: {
          name: true
        }
      }
    });

    const { result } = renderHook(() => useProductUploadBtnDisabled(false));

    expect(result.current.isDisabled).toBe(true);
  });

  it("dirtyFields가 부족한 경우 isDisabled는 true입니다.", () => {
    mockUseFormContext.mockReturnValue({
      getValues: jest.fn(),
      formState: {
        errors: {},
        dirtyFields: {
          name: true,
          price: false // 일부만 dirty
        }
      }
    });

    const { result } = renderHook(() => useProductUploadBtnDisabled(false));

    expect(result.current.isDisabled).toBe(true);
  });

  it("handleClickCancle 호출 시 router.push('/') 호출됩니다.", () => {
    mockUseFormContext.mockReturnValue({
      getValues: jest.fn(),
      formState: { errors: {}, dirtyFields: {} }
    });

    const { result } = renderHook(() => useProductUploadBtnDisabled());

    act(() => {
      result.current.handleClickCancle();
    });

    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
