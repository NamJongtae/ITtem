import { ERROR_MESSAGE } from "@/constants/constant";
import mongoose from "mongoose";

import { Product } from "@/lib/db/schema";
import { checkAuthorization } from "@/lib/server";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/lib/firebaseSetting";
import { ProductImgData } from '@/types/productTypes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { productId } = req.query;

      if (!productId) {
        res.status(422).json({ message: "상품 아이디가 없어요." });
        return;
      }

      await dbConnect();

      const product = await Product.findOne({
        _id: new mongoose.Types.ObjectId(productId as string),
      });

      if (!product) {
        res.status(404).json({ message: "상품이 존재하지 않아요." });
        return;
      }

      if (product.block) {
        res
          .status(409)
          .json({ message: "신고에 의해 블라인드 처리된 상품이에요." });
        return;
      }

      res.status(200).json({ message: "상품 조회에 성공했어요.", product });
    } catch (error) {
      console.error("상품 조회 에러", error);
      res.status(500).json({
        message: ERROR_MESSAGE,
      });
    }
  }

  if (req.method === "PATCH") {
    try {
      const isValidAuth = await checkAuthorization(req, res);
      if (!isValidAuth.isValid) {
        res.status(401).json({
          message: isValidAuth.message,
        });
        return;
      }
      const { productId } = req.query;
      const { productData } = req.body;

      if (!productId) {
        res.status(422).json({ message: "상품 id가 없어요." });
        return;
      }

      if (!productData) {
        res.status(422).json({ message: "상품 수정 데이터가 없어요." });
        return;
      }

      await dbConnect();

      const product = await Product.findOne({
        _id: new mongoose.Types.ObjectId(productId as string),
      });

      if (!product) {
        res.status(404).json({ message: "상품이 존재하지 않아요." });
        return;
      }

      const result = await Product.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(productId as string) },
        { $set: productData },
        { returnNewDocument: true }
      );

      if (!result) {
        res.status(500).json({ message: "상품 수정에 실패하였습니다." });
        return;
      }

      res
        .status(200)
        .json({ message: "상품 수정에 성공했어요.", product: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "상품 수정에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }

  if (req.method === "DELETE") {
    try {
      const isValidAuth = await checkAuthorization(req, res);

      if (!isValidAuth.isValid) {
        res.status(401).json({
          message: isValidAuth.message,
        });
        return;
      }

      const { productId } = req.query;

      if (!productId) {
        res.status(422).json({ message: "상품 아이디가 없어요." });
        return;
      }

      await dbConnect();

      const product = await Product.findOne({
        _id: new mongoose.Types.ObjectId(productId as string),
      });

      if (!product) {
        res.status(404).json({ message: "상품이 존재하지 않아요." });
        return;
      }

      if (product.uid !== isValidAuth.auth.uid) {
        res
          .status(401)
          .json({ message: "잘못된 요청이에요. 로그인 정보를 확인해주세요." });
        return;
      }
      const productImgNameArray = product.imgData.map((data: ProductImgData) => data.name);

      try {
        const removeImgPromise = productImgNameArray.map((name: string) => {
          return deleteObject(ref(storage, `images/product/${name}`));
        });

        await Promise.all(removeImgPromise);
      } catch (error) {
        console.error(error);
        console.log("상품 이미지 삭제에 실패했어요.");
      }

      const result = await Product.deleteOne({
        _id: new mongoose.Types.ObjectId(productId as string),
      });

      if (!result.acknowledged || result.deletedCount === 0) {
        res.status(500).json({
          message: "상품 삭제에 실패했어요.\n잠시 후 다시 시도해주세요.",
        });
      }

      res.status(200).json({ message: "상품이 삭제됬어요." });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "상품 삭제에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}
