import PurchaseTrading from "@/lib/db/models/PurchaseTrading";
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
      status !== "CANCEL_END/RETURN_END"
    ) {
      res.status(422).json({ message: "올바르지 않은 status이에요." });
      return;
    }

    const message =
      status === "CANCEL_END/RETURN_END"
        ? "취소/반품"
        : status === "TRADING_END"
        ? "거래완료"
        : "거래중";

    try {
      const currentCursor = cursor ? new Date(cursor as string) : new Date();
      const currentLimit = limit ? parseInt(limit as string, 10) : 10;
      const currentStatus =
        status === "CANCEL_END/RETURN_END"
          ? ["CANCEL_END", "RETURN_END"]
          : [status];

      let matchStage: any = {
        purchaseStartDate: { $lt: currentCursor },
        buyer: myUid,
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
          $sort: { purchaseStartDate: -1 },
        },
        {
          $limit: currentLimit,
        },
        {
          $addFields: {
            convertedProductId: { $toObjectId: "$productId" },
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "convertedProductId",
            foreignField: "_id",
            as: "productData",
          },
        },
        {
          $unwind: "$productData",
        },
        {
          $project: {
            "productData.name": 1,
            "productData.imgData.url": 1,
            "productData.price": 1,
            _id: 1,
            seller: 1,
            productId: 1,
            purchaseStartDate: 1,
            purchaseEndDate: 1,
            returnReason: 1,
            cancelReason: 1,
            cancelStartDate: 1,
            cancelEndDate: 1,
            returnStartDate: 1,
            returnEndDate: 1,
            process: 1,
            status: 1,
          },
        },
      ];
      const purchaseTrading = await PurchaseTrading.aggregate(aggregate);

      res
        .status(200)
        .json({ message: `${message} 목록 조회에 성공했어요.`, purchaseTrading });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: `${message} 목록 조회에 실패하였습니다.\n잠시 후 다시 시도해주세요.`,
      });
    }
  }
}
