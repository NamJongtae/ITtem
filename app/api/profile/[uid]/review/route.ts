import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Review from "@/lib/db/models/Review";
import { checkAuthorization } from "@/lib/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { uid: string | undefined } }
) {
  try {
    const { uid } = params;
    const { searchParams } = req.nextUrl;
    const limit = searchParams.get("limit");
    const cursor = searchParams.get("cursor");

    const isValidAuth = await checkAuthorization();
    if (!isValidAuth.isValid) {
      return NextResponse.json(
        { message: isValidAuth.message },
        { status: 401 }
      );
    }

    // Validate query parameters
    if (!uid) {
      return NextResponse.json(
        { message: "유저 ID가 없어요." },
        { status: 422 }
      );
    }

    if (uid.length < 24) {
      return NextResponse.json(
        { message: "유저가 존재하지 않아요." },
        { status: 404 }
      );
    }

    await dbConnect();

    const todayStart = new Date();
    const cursorDate = cursor ? new Date(cursor) : todayStart;
    const pageLimit = parseInt(limit || "10", 10);

    const reviewsWithBuyerInfo = await Review.aggregate([
      {
        $match: {
          sellerId: uid,
          createdAt: { $lt: cursorDate },
        },
      },
      {
        $limit: pageLimit,
      },
      {
        $sort: { createdAt: -1, _id: -1 },
      },
      {
        $addFields: {
          convertedBuyerId: { $toObjectId: "$buyerId" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "convertedBuyerId",
          foreignField: "_id",
          as: "reviewer",
        },
      },
      {
        $unwind: {
          path: "$reviewer",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          reviewTags: 1,
          sellerId: 1,
          _id: 1,
          reviewScore: 1,
          productName: 1,
          productId: 1,
          reviewContent: 1,
          createdAt: 1,
          "reviewer.nickname": 1,
          "reviewer.profileImg": 1,
          "reviewer.uid": "$reviewer._id",
        },
      },
    ]);

    return NextResponse.json({
      message: "리뷰 목록 조회에 성공했어요.",
      reviews: reviewsWithBuyerInfo,
    });
  } catch (error) {
    console.error("리뷰 목록 조회 에러:", error);
    return NextResponse.json(
      { message: "리뷰 목록 조회에 실패했어요.\n잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
