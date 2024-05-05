import dbConnect from "@/lib/db";
import { Product } from "@/lib/db/schema";
import { checkAuthorization } from "@/lib/server";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const isValidAuth = await checkAuthorization(req, res);

      if (!isValidAuth.isValid) {
        res.status(401).json({
          message: isValidAuth.message,
        });
        return;
      }

      const { productData } = req.body;

      await dbConnect();
      
      const newProduct = new Product(productData);

      await newProduct.save();

      console.log(newProduct)

      res.status(201).json({
        message: "상품 등록에 성공했어요.",
        product: newProduct,
      });
    } catch (error) {
      console.error(error);
      if (error instanceof mongoose.Error.ValidationError) {
        const errorMessages = Object.values(error.errors).map(
          (err) => err.message
        );
        res.status(422).json({
          message: "유효하지 않은 값이 있어요.",
          error: errorMessages,
        });
      }
      res.status(500).json({ message: "상품 등록에 실패하였어요." });
    }
  }
}
