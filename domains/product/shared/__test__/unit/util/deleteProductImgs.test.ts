import deleteProductImgs from "../../../utils/deleteProductImgs";
import deleteProductImgsToFirestore from "../../../utils/deleteProductImgsToFirestore";
import {
  ProductCategory,
  ProductCondition,
  ProductData,
  ProductSellType,
  ProductStatus,
  ProductTransaction
} from "../../../types/productTypes";

jest.mock("../../../utils/deleteProductImgsToFirestore", () => ({
  __esModule: true,
  default: jest.fn()
}));

describe("deleteProductImgs 함수 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const baseProductData: ProductData = {
    _id: "1",
    uid: "user123",
    name: "상품",
    price: 10000,
    description: "설명",
    isWish: false,
    transaction: ProductTransaction.직거래,
    deliveryFee: "포함",
    returnPolicy: "가능",
    condition: ProductCondition.A,
    location: "서울",
    category: ProductCategory.의류,
    imgData: [
      { url: "url1.jpg", name: "img1.jpg" },
      { url: "url2.jpg", name: "img2.jpg" }
    ],
    status: ProductStatus.sold,
    block: false,
    reportCount: 0,
    reportUserIds: [],
    wishCount: 0,
    viewCount: 0,
    sellType: ProductSellType.중고거래
  };

  it("productEditData.imgData와 values.prevImgData가 있으면 deleteProductImgsToFirestore를 호출해야 합니다", async () => {
    const productEditData = {
      imgData: [{ url: "url1.jpg", name: "img1.jpg" }]
    };

    await deleteProductImgs({
      productData: baseProductData,
      productEditData
    });

    expect(deleteProductImgsToFirestore).toHaveBeenCalledWith(
      ["img1.jpg", "img2.jpg"],
      ["img1.jpg"]
    );
  });

  it("productEditData.imgData가 없으면 deleteProductImgsToFirestore를 호출하지 않아야 합니다.", async () => {
    const productEditData = {};

    await deleteProductImgs({
      productData: baseProductData,
      productEditData
    });

    expect(deleteProductImgsToFirestore).not.toHaveBeenCalled();
  });
});
