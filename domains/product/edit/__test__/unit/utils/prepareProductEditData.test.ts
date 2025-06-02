import prepareProductEditData from "@/domains/product/edit/utils/prepareProductEditData";
import {
  ProductCategory,
  ProductCondition,
  ProductData,
  ProductReturnPolicy,
  ProductSellType,
  ProductStatus,
  ProductTransaction
} from "@/domains/product/shared/types/productTypes";
import { UploadImgResponseData } from "@/domains/product/upload/types/productUploadTypes";

jest.mock(
  "@/domains/product/upload/utils/uploadMultiProductImgToFirestore",
  () => ({
    __esModule: true,
    default: jest.fn()
  })
);

import uploadMultiImgToFirestore from "@/domains/product/upload/utils/uploadMultiProductImgToFirestore";

describe("prepareProductEditData", () => {
  const baseProductData: ProductData = {
    _id: "product123",
    uid: "user123",
    name: "기존 제품",
    price: 10000,
    description: "기존 설명",
    transaction: ProductTransaction.직거래,
    deliveryFee: "포함",
    returnPolicy: "가능" as ProductReturnPolicy,
    condition: ProductCondition.A,
    location: "서울",
    category: ProductCategory.신발,
    imgData: [{ url: "existing.jpg", name: "existing.jpg" }],
    status: ProductStatus.sold,
    block: false,
    reportCount: 0,
    reportUserIds: [],
    wishCount: 0,
    wishUserIds: [],
    viewCount: 0,
    sellType: ProductSellType.중고거래
  };

  it("가격이 다르면 productEditData.price가 변경됩니다.", async () => {
    const values = { price: "20,000" };
    const productEditData: Partial<ProductData> = {};

    await prepareProductEditData({
      values,
      productData: baseProductData,
      productEditData
    });

    expect(productEditData.price).toBe(20000);
  });

  it("이름이 다르면 productEditData.name이 변경됩니다.", async () => {
    const values = { name: "새로운 제품명" };
    const productEditData: Partial<ProductData> = {};

    await prepareProductEditData({
      values,
      productData: baseProductData,
      productEditData
    });

    expect(productEditData.name).toBe("새로운 제품명");
  });

  it("이미지 데이터가 변경되면 imgData가 업데이트됩니다.", async () => {
    const mockImgData: UploadImgResponseData[] = [
      { url: "new1.jpg", name: "new1.jpg" }
    ];

    (uploadMultiImgToFirestore as jest.Mock).mockResolvedValue(mockImgData);

    const values = {
      prevImgData: [],
      imgData: [
        new File(["dummy content"], "file1.jpg", { type: "image/jpeg" })
      ]
    };
    const productEditData: Partial<ProductData> = {};

    await prepareProductEditData({
      values,
      productData: baseProductData,
      productEditData
    });

    expect(productEditData.imgData).toEqual(mockImgData);
  });

  it("description이 다르면 productEditData.description이 변경됩니다.", async () => {
    const values = { description: "새로운 설명" };
    const productEditData: Partial<ProductData> = {};

    await prepareProductEditData({
      values,
      productData: baseProductData,
      productEditData
    });

    expect(productEditData.description).toBe("새로운 설명");
  });

  it("transaction이 다르면 productEditData.transaction이 변경됩니다.", async () => {
    const values = { transaction: ProductTransaction.택배 };
    const productEditData: Partial<ProductData> = {};

    await prepareProductEditData({
      values,
      productData: baseProductData,
      productEditData
    });

    expect(productEditData.transaction).toBe(ProductTransaction.택배);
  });

  it("deliveryFee가 다르면 productEditData.deliveryFee가 변경됩니다.", async () => {
    const values = { deliveryFee: "미포함" };
    const productEditData: Partial<ProductData> = {};

    await prepareProductEditData({
      values,
      productData: baseProductData,
      productEditData
    });

    expect(productEditData.deliveryFee).toBe("미포함");
  });

  it("returnPolicy가 다르면 productEditData.returnPolicy가 변경됩니다.", async () => {
    const values = { returnPolicy: "불가" as ProductReturnPolicy };
    const productEditData: Partial<ProductData> = {};

    await prepareProductEditData({
      values,
      productData: baseProductData,
      productEditData
    });

    expect(productEditData.returnPolicy).toBe("불가");
  });

  it("condition이 다르면 productEditData.condition이 변경됩니다.", async () => {
    const values = { condition: ProductCondition.B };
    const productEditData: Partial<ProductData> = {};

    await prepareProductEditData({
      values,
      productData: baseProductData,
      productEditData
    });

    expect(productEditData.condition).toBe(ProductCondition.B);
  });

  it("location이 다르면 productEditData.location이 변경됩니다.", async () => {
    const values = { location: "부산" };
    const productEditData: Partial<ProductData> = {};

    await prepareProductEditData({
      values,
      productData: baseProductData,
      productEditData
    });

    expect(productEditData.location).toBe("부산");
  });

  it("category가 다르면 productEditData.category가 변경됩니다.", async () => {
    const values = { category: ProductCategory.의류 };
    const productEditData: Partial<ProductData> = {};

    await prepareProductEditData({
      values,
      productData: baseProductData,
      productEditData
    });

    expect(productEditData.category).toBe(ProductCategory.의류);
  });

  it("기존 값과 동일한 값은 productEditData에 반영되지 않아야 합니다.", async () => {
    const values = {
      name: baseProductData.name,
      price: "10,000"
    };
    const productEditData: Partial<ProductData> = {};

    await prepareProductEditData({
      values,
      productData: baseProductData,
      productEditData
    });

    expect(productEditData).toEqual({});
  });
});
