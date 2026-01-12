import { NextRequest, NextResponse } from "next/server";
import mongoose, { FilterQuery } from "mongoose";
import Product from "@/domains/product/shared/models/Product";
import checkAuthorization from "@/domains/auth/shared/common/utils/checkAuthorization";
import dbConnect from "@/shared/common/utils/db/db";
import * as Sentry from "@sentry/nextjs";
import Wish, { type WishDB } from "@/domains/product/shared/models/Wish";
import { WishlistProductData } from "@/domains/user/profile/types/profileTypes";

type WishListItem = {
  _id: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  createdAt: Date;
};

export async function GET(req: NextRequest) {
  try {
    const isValidAuth = await checkAuthorization();
    if (!isValidAuth.isValid) {
      return NextResponse.json(
        { message: isValidAuth.message },
        { status: 401 }
      );
    }

    const myUid = isValidAuth.auth?.uid;
    if (!myUid || myUid.length < 24) {
      return NextResponse.json(
        { message: "유저 정보가 없어요." },
        { status: 401 }
      );
    }

    const cursor = req.nextUrl.searchParams.get("cursor");
    const limit = req.nextUrl.searchParams.get("limit");

    await dbConnect();

    const pageLimit = Number.isFinite(Number(limit))
      ? Math.max(Number(limit), 1)
      : 10;

    const userObjectId = new mongoose.Types.ObjectId(myUid);

    const wishQuery: FilterQuery<WishDB> = {
      userId: userObjectId
    };

    if (cursor && cursor.length >= 24) {
      wishQuery._id = { $lt: new mongoose.Types.ObjectId(cursor) };
    }

    const wishes = await Wish.find(wishQuery)
      .select("_id productId createdAt")
      .sort({ _id: -1 })
      .limit(pageLimit)
      .lean<WishListItem[]>();

    if (!wishes.length) {
      return NextResponse.json(
        { message: "찜 목록이 없어요.", products: [] as WishlistProductData[] },
        { status: 200 }
      );
    }

    const productIds = wishes.map((w) => w.productId);

    const products = await Product.find({
      _id: { $in: productIds },
      block: false
    })
      .select("_id price name imgData createdAt location")
      .lean<WishlistProductData[]>();

    // ✅ $in 조회는 순서 보장 X → wish 순서대로 재정렬
    const productMap = new Map<string, WishlistProductData>(
      products.map((p) => [String(p._id), p])
    );

    const orderedProducts: WishlistProductData[] = wishes
      .map((w) => productMap.get(String(w.productId)))
      .filter((p): p is WishlistProductData => Boolean(p));

    return NextResponse.json({
      message: "찜 목록 조회에 성공했어요.",
      products: orderedProducts,
      // ✅ 다음 페이지 커서: 이번 페이지의 "마지막" (가장 오래된) wish _id
      nextCursor: String(wishes[wishes.length - 1]._id)
    });
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json(
      { message: "찜 목록 조회에 실패했어요.\n잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const isValidAuth = await checkAuthorization();
    if (!isValidAuth.isValid) {
      return NextResponse.json(
        { message: isValidAuth.message },
        { status: 401 }
      );
    }

    const myUid = isValidAuth.auth?.uid;
    if (!myUid || myUid.length < 24) {
      return NextResponse.json(
        { message: "유저 정보가 없어요." },
        { status: 401 }
      );
    }

    const body = (await req.json()) as { wishProductIds?: string[] };
    const wishProductIds = body.wishProductIds;

    if (!wishProductIds || wishProductIds.length === 0) {
      return NextResponse.json(
        { message: "삭제할 찜 목록 ID가 없어요." },
        { status: 422 }
      );
    }

    await dbConnect();

    const userObjectId = new mongoose.Types.ObjectId(myUid);

    // ✅ 유효한 ObjectId만 변환 (안전)
    const objectIdArray = wishProductIds
      .filter((id) => typeof id === "string" && id.length >= 24)
      .map((id) => new mongoose.Types.ObjectId(id));

    if (objectIdArray.length === 0) {
      return NextResponse.json(
        { message: "삭제할 찜 목록 ID가 올바르지 않아요." },
        { status: 422 }
      );
    }

    // ✅ any 제거: select + lean 타입 지정
    const existingWishes = await Wish.find({
      userId: userObjectId,
      productId: { $in: objectIdArray }
    })
      .select("productId")
      .lean<Array<Pick<WishDB, "productId">>>();

    if (existingWishes.length === 0) {
      return NextResponse.json(
        { message: "삭제할 찜이 없어요." },
        { status: 409 }
      );
    }

    const existingProductIds = existingWishes.map((w) => w.productId);

    const wishDeleteResult = await Wish.deleteMany({
      userId: userObjectId,
      productId: { $in: existingProductIds }
    });

    if (!wishDeleteResult.acknowledged) {
      return NextResponse.json(
        { message: "찜 목록 삭제에 실패했어요.\n잠시 후 다시 시도해주세요." },
        { status: 500 }
      );
    }

    // ✅ wishCount는 0 아래로 내려가지 않게 조건 유지
    await Product.updateMany(
      { _id: { $in: existingProductIds }, wishCount: { $gt: 0 } },
      { $inc: { wishCount: -1 } }
    );

    return NextResponse.json({
      message: "찜 목록 삭제에 성공했어요.",
      deletedProductIds: existingProductIds.map(String)
    });
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json(
      { message: "찜 목록 삭제에 실패했어요.\n잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
