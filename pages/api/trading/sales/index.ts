import SaleTrading from "@/lib/db/models/SaleTrading";
import { checkAuthorization } from "@/lib/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { search, status, cursor, limit } = req.query;

    const isValidAuth = await checkAuthorization(req, res);

    if (!isValidAuth.isValid) {
      res.status(401).json({
        message: isValidAuth.message,
      });
      return;
    }

    const myUid = isValidAuth?.auth?.uid;

    if (
      status !== "TRADING" &&
      status !== "TRADING_END" &&
      status !== "CANCEL_END/RETURN_END" &&
      status !== "CANCEL_REJECT/RETURN_REJECT"
    ) {
      res.status(422).json({ message: "올바르지 않은 status이에요." });
      return;
    }

    const message =
      status === "CANCEL_END/RETURN_END"
        ? "취소/반품"
        : status === "TRADING_END"
        ? "거래완료"
        : status === "CANCEL_REJECT/RETURN_REJECT"
        ? "취소/반품 거절"
        : "거래중";

    try {
      const currentCursor = cursor ? new Date(cursor as string) : new Date();
      const currentLimit = limit ? parseInt(limit as string, 10) : 10;
      const currentStatus =
        status === "CANCEL_END/RETURN_END"
          ? ["CANCEL_END", "RETURN_END"]
          : status === "TRADING_END"
          ? ["TRADING_END"]
          : status === "CANCEL_REJECT/RETURN_REJECT"
          ? ["CANCEL_REJECT", "RETURN_REJECT"]
          : ["TRADING", "CANCEL", "RETURN"];
      let matchStage: any = {
        saleStartDate: { $lt: currentCursor },
        sellerId: myUid,
        status: { $in: currentStatus },
      };

      if (search) {
        matchStage.productName = { $regex: search, $options: "i" };
      }

      const aggregate: any[] = [
        {
          $match: matchStage,
        },
        {
          $sort: { saleStartDate: -1 },
        },
        {
          $limit: currentLimit,
        },
        {
          $addFields: {
            convertedSellerId: { $toObjectId: "$sellerId" },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "convertedSellerId",
            foreignField: "_id",
            as: "sellerInfo",
          },
        },
        {
          $unwind: { path: "$sellerInfo", preserveNullAndEmptyArrays: true },
        },
        {
          $addFields: {
            convertedbuyerId: { $toObjectId: "$buyerId" },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "convertedbuyerId",
            foreignField: "_id",
            as: "buyerInfo",
          },
        },
        {
          $unwind: { path: "$buyerInfo", preserveNullAndEmptyArrays: true },
        },
        {
          $project: {
            "sellerInfo.nickname": 1,
            "buyerInfo.nickname": 1,
            _id: 1,
            sellerId: 1,
            buyerId: 1,
            productId: 1,
            productName: 1,
            productPrice:1,
            productImg:1,
            saleStartDate: 1,
            saleEndDate: 1,
            returnReason: 1,
            returnRejectReason: 1,
            cancelReason: 1,
            cancelRejectReason: 1,
            cancelStartDate: 1,
            cancelEndDate: 1,
            cancelRejectDate: 1,
            returnStartDate: 1,
            returnEndDate: 1,
            returnRejectDate: 1,
            process: 1,
            status: 1,
            isReviewed: 1,
          },
        },
      ];
      const saleTrading = await SaleTrading.aggregate(aggregate);

      if(saleTrading.length===0) {
        res.status(404).json({message: `${message} 목록이 없어요.`});
        return;
      }
      res
        .status(200)
        .json({ message: `${message} 목록 조회에 성공했어요.`, saleTrading });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: `${message} 목록 조회에 실패하였습니다.\n잠시 후 다시 시도해주세요.`,
      });
    }
  }
}