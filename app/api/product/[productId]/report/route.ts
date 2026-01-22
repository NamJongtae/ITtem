import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import checkAuthorization from "@/domains/auth/shared/common/utils/checkAuthorization";
import Product from "@/domains/product/shared/models/Product";
import Report from "@/domains/product/shared/models/Report";
import { ProductStatus } from "@/domains/product/shared/types/productTypes";
import * as Sentry from "@sentry/nextjs";

type ProductReportResult = {
  reportCount: number;
  block: boolean;
};

const REPORT_BLOCK_THRESHOLD = 5;

export async function POST(
  req: NextRequest,
  {
    params
  }: {
    params: Promise<{ productId: string | undefined }>;
  }
) {
  const session = await mongoose.startSession();

  try {
    const isValidAuth = await checkAuthorization();
    if (!isValidAuth.isValid) {
      return NextResponse.json(
        { message: isValidAuth.message },
        { status: 401 }
      );
    }

    const { productId } = await params;
    const myUid = isValidAuth.auth?.uid;

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
    if (!myUid || myUid.length < 24) {
      return NextResponse.json(
        { message: "유저 정보가 없어요." },
        { status: 401 }
      );
    }

    const productObjectId = new mongoose.Types.ObjectId(productId);
    const userObjectId = new mongoose.Types.ObjectId(myUid);

    const result = await session.withTransaction(
      async (): Promise<ProductReportResult> => {
        // 1) 상품 존재 + 상태 체크 (트랜잭션 안에서 읽기)
        const product = await Product.findOne({ _id: productObjectId })
          .select("uid status reportCount block")
          .session(session)
          .lean<{
            uid: string;
            status: string;
            reportCount: number;
            block: boolean;
          } | null>();

        if (!product) {
          throw Object.assign(new Error("NOT_FOUND"), {
            status: 404,
            message: "상품이 존재하지 않아요."
          });
        }

        if (product.status === ProductStatus.soldout) {
          throw Object.assign(new Error("SOLDOUT"), {
            status: 409,
            message: "이미 판매된 상품은 신고할 수 없어요."
          });
        }

        if (String(product.uid) === String(myUid)) {
          throw Object.assign(new Error("OWN_PRODUCT"), {
            status: 409,
            message: "본인 상품은 신고할 수 없어요."
          });
        }

        // 2) Report 문서 생성 (중복이면 11000)
        try {
          await Report.create(
            [
              {
                userId: userObjectId,
                productId: productObjectId
              }
            ],
            { session }
          );
        } catch (e: any) {
          // reportSchema.index({ userId: 1, productId: 1 }, { unique: true });
          if (e?.code === 11000) {
            throw Object.assign(new Error("DUP_REPORT"), {
              status: 409,
              message: "이미 신고한 상품이에요."
            });
          }
          throw e;
        }

        // 3) 상품 reportCount +1
        const afterInc = await Product.findOneAndUpdate(
          { _id: productObjectId },
          { $inc: { reportCount: 1 } },
          { new: true, session }
        )
          .select("reportCount block")
          .lean<ProductReportResult | null>();

        if (!afterInc) {
          throw Object.assign(new Error("UPDATE_FAIL"), {
            status: 500,
            message: "상품 신고에 실패했어요.\n잠시 후 다시 시도해주세요."
          });
        }

        // 4) block 처리 (0->1로만 변경)
        const shouldBlock = afterInc.reportCount >= REPORT_BLOCK_THRESHOLD;
        if (shouldBlock && !afterInc.block) {
          await Product.updateOne(
            { _id: productObjectId },
            { $set: { block: true } },
            { session }
          );
          return { ...afterInc, block: true };
        }

        return afterInc;
      }
    );

    return NextResponse.json(
      {
        message: result.block
          ? "상품 신고가 누적되어 블라인드 처리되었어요."
          : "해당 상품을 신고했어요.",
        reportCount: result.reportCount,
        block: result.block
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    Sentry.captureException(error);

    const status = typeof error?.status === "number" ? error.status : 500;
    const message =
      typeof error?.message === "string"
        ? error.message
        : "상품 신고에 실패했어요.\n잠시 후 다시 시도해주세요.";

    return NextResponse.json({ message }, { status });
  } finally {
    await session.endSession();
  }
}
