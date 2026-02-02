import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import dbConnect from "@/shared/common/utils/db/db";
import EmailVerification from "@/domains/auth/signup/models/EmailVerification";
import EmailVerificationBlock from "@/domains/auth/signup/models/EmailVerificationBlock";
import { hashVerificationCode } from "@/domains/auth/signup/utils/hashVerificationCode ";
import {
  VERIFIED_EMAIL_EXP,
  VERIFICATION_EMAIL_BLOCK_EXP
} from "@/domains/auth/shared/common/constants/constansts";

export async function POST(req: NextRequest) {
  try {
    const { email, verificationCode, type } = await req.json();

    if (
      !email ||
      !verificationCode ||
      (type !== "signup" && type !== "resetPw")
    ) {
      return NextResponse.json(
        { message: "유효하지 않은 값이 있어요.", ok: false },
        { status: 422 }
      );
    }

    await dbConnect();

    const now = new Date();

    const blocked = await EmailVerificationBlock.findOne({
      email,
      type,
      blockedUntil: { $gt: now }
    }).select({ _id: 1 });

    if (blocked) {
      return NextResponse.json(
        {
          message:
            "인증메일 전송, 인증 일일 시도 횟수를 초과하여\n24시간 동안 요청이 제한되요.",
          ok: false
        },
        { status: 403 }
      );
    }

    const doc = await EmailVerification.findOne({
      email,
      type,
      expiresAt: { $gt: now }
    }).select({ verificationCodeHash: 1, count: 1, isVerified: 1 });

    if (!doc) {
      return NextResponse.json(
        { message: "인증코드가 만료되었거나 존재하지 않아요.", ok: false },
        { status: 410 }
      );
    }

    if (doc.isVerified) {
      return NextResponse.json({
        message: "이미 인증이 완료됐어요.",
        ok: true
      });
    }

    const inputHash = hashVerificationCode(verificationCode.toUpperCase());
    const isMatch = inputHash === doc.verificationCodeHash;

    if (isMatch) {
      const verifiedExpiresAt = new Date(
        Date.now() + VERIFIED_EMAIL_EXP * 1000
      );

      await EmailVerification.updateOne(
        { _id: doc._id },
        { $set: { isVerified: true, expiresAt: verifiedExpiresAt } }
      );

      return NextResponse.json({ message: "인증이 완료됬어요.", ok: true });
    }

    const updated = await EmailVerification.findOneAndUpdate(
      { _id: doc._id },
      { $inc: { count: 1 } },
      { new: true }
    ).select({ count: 1 });

    const newCount = updated?.count ?? (doc.count ?? 0) + 1;

    if (newCount >= 10) {
      const blockedUntil = new Date(
        Date.now() + VERIFICATION_EMAIL_BLOCK_EXP * 1000
      );

      await EmailVerificationBlock.updateOne(
        { email, type },
        { $set: { blockedUntil }, $setOnInsert: { email, type } },
        { upsert: true }
      );

      return NextResponse.json(
        {
          message:
            "인증메일 전송, 인증 일일 시도 횟수를 초과하여\n24시간 동안 요청이 제한되요.",
          ok: false
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { message: "인증코드가 일치하지 않아요.", ok: false },
      { status: 401 }
    );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json(
      {
        message: "인증에 실패했어요.\n잠시 후 다시 시도해주세요.",
        ok: false
      },
      { status: 500 }
    );
  }
}
