import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/db";
import mongoose from "mongoose";
import Product from "@/lib/db/models/Product";
import User from "@/lib/db/models/User";
import { checkAuthorization } from "@/lib/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string | undefined }> }
) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const isValidAuth = await checkAuthorization();

    if (!isValidAuth?.isValid) {
      return NextResponse.json(
        { message: isValidAuth?.message },
        { status: 401 }
      );
    }

    const { productId } = await params;

    const myUid = isValidAuth?.auth?.uid;

    if (!productId) {
      return NextResponse.json(
        { message: "상품 ID가 없어요." },
        { status: 422 }
      );
    }

    if (productId.length < 24) {
      return NextResponse.json(
        { message: "잘못된 상품 ID에요." },
        { status: 422 }
      );
    }

    await dbConnect();

    const product = await Product.findOne({
      _id: new mongoose.Types.ObjectId(productId as string)
    }).session(session);

    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(myUid)
    }).session(session);

    if (!product) {
      return NextResponse.json(
        { message: "상품이 존재하지 않아요." },
        { status: 404 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { message: "유저가 존재하지 않아요." },
        { status: 401 }
      );
    }

    if (
      product.wishUserIds.includes(myUid) &&
      user.wishProductIds.includes(product._id)
    ) {
      return NextResponse.json(
        { message: "이미 찜한 상품이에요." },
        { status: 409 }
      );
    }

    // 유저 찜 목록에 상품 추가
    if (!user.wishProductIds.includes(product._id)) {
      const profileResult = await User.updateOne(
        {
          _id: new mongoose.Types.ObjectId(myUid)
        },
        {
          $addToSet: {
            wishProductIds: new mongoose.Types.ObjectId(product._id as string)
          }
        },
        { session }
      );

      if (!profileResult.acknowledged || profileResult.modifiedCount === 0) {
        throw new Error("유저 찜 목록에 상품 ID 추가에 실패했어요.");
      }
    }

    // 상품 찜 목록에 유저 추가
    if (!product.wishUserIds.includes(myUid)) {
      const productResult = await Product.updateOne(
        {
          _id: new mongoose.Types.ObjectId(product._id as string)
        },
        {
          $addToSet: { wishUserIds: myUid },
          $inc: { wishCount: 1 }
        },
        { session }
      );

      if (!productResult.acknowledged || productResult.modifiedCount === 0) {
        throw new Error("상품 찜 목록에 유저 ID 추가에 실패했어요.");
      }
    }

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({ message: "상품을 찜했어요." }, { status: 200 });
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      { message: "상품 찜에 실패했어요.\n잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string | undefined }> }
) {
  try {
    const isValidAuth = await checkAuthorization();

    if (!isValidAuth?.isValid) {
      return NextResponse.json(
        {
          message: isValidAuth?.message
        },
        { status: 401 }
      );
    }

    const { productId } = await params;

    const myUid = isValidAuth?.auth?.uid;

    if (!productId) {
      return NextResponse.json(
        { message: "상품 ID가 없어요." },
        { status: 422 }
      );
    }

    await dbConnect();

    const product = await Product.findOne({
      _id: new mongoose.Types.ObjectId(productId as string)
    });

    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(myUid)
    });

    if (!user) {
      return NextResponse.json(
        { message: "유저가 존재하지 않아요." },
        { status: 401 }
      );
    }

    if (!product) {
      return NextResponse.json(
        { message: "상품이 존재하지 않아요." },
        { status: 404 }
      );
    }

    if (
      !product.wishUserIds.includes(isValidAuth?.auth?.uid) &&
      !user.wishProductIds.includes(product._id)
    ) {
      return NextResponse.json(
        { message: "찜한 상품이 아니에요." },
        { status: 409 }
      );
    }

    if (user.wishProductIds.includes(product._id)) {
      const profileResult = await User.updateOne(
        {
          _id: new mongoose.Types.ObjectId(myUid)
        },
        { $pull: { wishProductIds: product._id } }
      );
      if (!profileResult.acknowledged || profileResult.modifiedCount === 0) {
        throw new Error("유저 찜 목록에서 상품 ID 삭제에 실패했어요.");
      }
    }

    if (product.wishUserIds.includes(isValidAuth?.auth?.uid)) {
      const productResult = await Product.updateOne(
        { _id: new mongoose.Types.ObjectId(productId as string) },
        {
          $inc: { wishCount: -1 },
          $pull: { wishUserIds: isValidAuth?.auth?.uid }
        }
      );
      if (!productResult.acknowledged || productResult.modifiedCount === 0) {
        throw new Error("상품 찜 목록에서 유저 ID 삭제에 실패했어요.");
      }
    }

    return NextResponse.json(
      { message: "상품을 찜 삭제에 성공했어요." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "상품 찜 삭제에 실패했어요.\n잠시 후 다시 시도해주세요."
      },
      { status: 500 }
    );
  }
}
