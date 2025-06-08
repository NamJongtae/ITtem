import { renderHook, act } from "@testing-library/react";
import useProductWishHandler from "../../../hooks/useProductWishHandler";
import useAddWishMutate from "../../../hooks/mutations/useAddWishMutate";
import useDeleteWishMutate from "../../../hooks/mutations/useDeleteWishMutate";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

jest.mock("../../../hooks/mutations/useAddWishMutate");
jest.mock("../../../hooks/mutations/useDeleteWishMutate");

import { ProductDetailData } from "../../../types/productDetailTypes";
import { ProfileData } from "@/domains/user/profile/types/profileTypes";

const mockToastWarn = toast.warn as jest.Mock;
const mockUseAddWishMutate = useAddWishMutate as jest.Mock;
const mockUseDeleteWishMutate = useDeleteWishMutate as jest.Mock;

describe("useProductWishHandler", () => {
  const mockAddMutate = jest.fn();
  const mockDeleteMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAddWishMutate.mockReturnValue({
      addWishMutate: mockAddMutate,
      addWishPending: false
    });

    mockUseDeleteWishMutate.mockReturnValue({
      deleteWishMutate: mockDeleteMutate,
      deleteWishPending: false
    });
  });

  const mockProduct: ProductDetailData = {
    _id: "product1",
    wishUserIds: ["user123"]
  } as ProductDetailData;

  const mockProfile: ProfileData = {
    uid: "user123",
    wishProductIds: ["product1"]
  } as ProfileData;

  it("로그인하지 않은 경우 toast.warn이 호출됩니다.", () => {
    const { result } = renderHook(() =>
      useProductWishHandler({
        productDetailData: mockProduct,
        myProfileData: undefined
      })
    );

    act(() => {
      result.current.handleClickWish();
    });

    expect(mockToastWarn).toHaveBeenCalledWith("로그인이 필요해요.");
    expect(mockAddMutate).not.toHaveBeenCalled();
    expect(mockDeleteMutate).not.toHaveBeenCalled();
  });

  it("이미 찜한 경우 deleteWishMutate가 호출됩니다.", () => {
    const { result } = renderHook(() =>
      useProductWishHandler({
        productDetailData: mockProduct,
        myProfileData: mockProfile
      })
    );

    act(() => {
      result.current.handleClickWish();
    });

    expect(result.current.isWish).toBe(true);
    expect(mockDeleteMutate).toHaveBeenCalled();
    expect(mockAddMutate).not.toHaveBeenCalled();
  });

  it("해당 상품을 찜하지 않은 경우 addWishMutate가 호출됩니다.", () => {    
    const mockProfileNoWish = {
      uid: "user123",
      wishProductIds: ["prodcut2"] 
    } as ProfileData;

    const mockProductNoWish = {
      _id: "product1",
      wishUserIds: ["user456"]
    } as ProductDetailData;

    const { result } = renderHook(() =>
      useProductWishHandler({
        productDetailData: mockProductNoWish,
        myProfileData: mockProfileNoWish
      })
    );

    act(() => {
      result.current.handleClickWish();
    });

    expect(result.current.isWish).toBe(false);
    expect(mockAddMutate).toHaveBeenCalled();
    expect(mockDeleteMutate).not.toHaveBeenCalled();
  });
});
