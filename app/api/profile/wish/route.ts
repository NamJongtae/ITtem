import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "@/lib/db/models/Product";
import { checkAuthorization } from "@/lib/server";
import User from "@/lib/db/models/User";
import dbConnect from "@/lib/db/db";

export async function POST(req: NextRequest) {
  try {
    const isValidAuth = await checkAuthorization();

    if (!isValidAuth.isValid) {
      return NextResponse.json(
        {
          message: isValidAuth.message
        },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { wishProductIds } = body;
    const cursor = req.nextUrl.searchParams.get("cursor");
    const limit = req.nextUrl.searchParams.get("limit");

    if (!wishProductIds) {
      return NextResponse.json(
        { message: "찜 목록 ID가 필요합니다." },
        { status: 422 }
      );
    }

    if (!wishProductIds.length) {
      return NextResponse.json(
        { message: "찜 목록이 없어요.", products: [] },
        { status: 200 }
      );
    }

    await dbConnect();

    const pageLimit = parseInt(limit as string, 10) || 10;

    const objectIdArray = wishProductIds.map(
      (id: string) => new mongoose.Types.ObjectId(id)
    );

    const query = {
      _id: cursor
        ? {
            $in: objectIdArray,
            $gt: new mongoose.Types.ObjectId(cursor as string)
          }
        : {
            $in: objectIdArray
          },
      block: false
    };

    const products = await Product.find(query)
      .select("_id price name imgData createdAt location")
      .limit(pageLimit)
      .sort({ _id: 1 });

    return NextResponse.json({
      message: "찜 목록 조회에 성공했어요.",
      products
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "찜 목록 조회에 실패했어요.\n잠시 후 다시 시도해주세요."
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { wishProductIds } = await req.json();

    const isValidAuth = await checkAuthorization();

    if (!isValidAuth.isValid) {
      return NextResponse.json(
        {
          message: isValidAuth.message
        },
        { status: 401 }
      );
    }

    if (!wishProductIds || !wishProductIds.length) {
      return NextResponse.json(
        { message: "삭제할 찜 목록 ID가 없어요." },
        { status: 422 }
      );
    }

    const myUid = isValidAuth?.auth?.uid;

    const objectIdArray = wishProductIds.map(
      (id: string) => new mongoose.Types.ObjectId(id)
    );

    const profileUpadteResult = await User.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(myUid)
      },
      {
        $pull: { wishProductIds: { $in: objectIdArray } }
      },
      { returnDocument: "after" }
    );

    const productUpdateResults = await Product.updateMany(
      { _id: { $in: objectIdArray } },
      {
        $inc: { wishCount: -1 },
        $pull: { wishUserIds: myUid }
      }
    );

    if (!profileUpadteResult || productUpdateResults.modifiedCount === 0) {
      return NextResponse.json(
        {
          message: "찜 목록 삭제에 실패했어요.\n잠시 후 다시 시도해주세요."
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "찜 목록 삭제에 성공했어요.",
      wishProductIds: profileUpadteResult.wishProductIds
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "찜 목록 삭제에 실패했어요.\n잠시 후 다시 시도해주세요."
      },
      { status: 500 }
    );
  }
}
