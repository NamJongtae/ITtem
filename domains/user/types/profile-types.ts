export interface ProfileReviewData {
  totalReviewScore: number;
  totalReviewCount: number;
  reviewPercentage: number;
  reviewTags: number[];
}

export interface ProfileData {
  uid: string;
  email: string;
  nickname: string;
  profileImg: string;
  profileImgFilename: string;
  introduce: string;
  followers: string[];
  followings: string[];
  productIds: string[];
  wishProductIds: string[];
  saleCount: number;
  purchaseCount: number;
  transactionCount: number;
  reviewInfo?: ProfileReviewData;
  reviewPercentage: number;
}

export interface ProfileEditData {
  profileImg: string;
  profileImgFilename: string;
  nickname: string;
  introduce: string;
}

export interface ProfileReviewData {
  _id: string;
  reviewScore: number;
  productName: string;
  productId: string;
  reviewContent: string;
  sellerId: string;
  createdAt: string;
  reviewTags: number[];
  reviewer: {
    nickname: string;
    profileImg: string;
    uid: string;
  };
}

export type ProfileMenu = "판매상품" | "거래후기" | "팔로잉" | "팔로워" | "찜";
