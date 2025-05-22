// /app/sitemap.xml/route.ts
import { BASE_URL } from "@/constants/constant";
import dbConnect from "@/utils/db/db";
import Product from "@/domains/product/models/Product";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

type ProductId = {
  _id: Types.ObjectId;
};

export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();
  const productdId = (await Product.find({}, "_id").lean()) as ProductId[];

  const products = productdId.map((p) => ({
    loc: `${BASE_URL}/product/${p._id.toString()}`,
    lastmod: new Date().toISOString()
  }));

  const staicUrls = [
    {
      loc: "https://ittem.vercel.app",
      lastmod: new Date().toISOString()
    },
    {
      loc: "https://ittem.vercel.app/signin",
      lastmod: new Date().toISOString()
    },
    {
      loc: "https://ittem.vercel.app/signup",
      lastmod: new Date().toISOString()
    },
    {
      loc: "https://ittem.vercel.app/find-password",
      lastmod: new Date().toISOString()
    },
    {
      loc: "https://ittem.vercel.app/product",
      lastmod: new Date().toISOString()
    },
    {
      loc: "https://ittem.vercel.app/product?category=%EA%B0%80%EB%B0%A9%2F%EC%A7%80%EA%B0%91",
      lastmod: new Date().toISOString()
    },
    {
      loc: "https://ittem.vercel.app/product?category=%EC%8B%A0%EB%B0%9C",
      lastmod: new Date().toISOString()
    },
    {
      loc: "https://ittem.vercel.app/product?category=%EC%8B%9C%EA%B3%84",
      lastmod: new Date().toISOString()
    },
    {
      loc: "https://ittem.vercel.app/product?category=%EC%8A%A4%ED%8F%AC%EC%B8%A0",
      lastmod: new Date().toISOString()
    },
    {
      loc: "https://ittem.vercel.app/product?category=%EC%95%85%EC%84%B8%EC%82%AC%EB%A6%AC",
      lastmod: new Date().toISOString()
    },
    {
      loc: "https://ittem.vercel.app/product?category=%EC%95%85%EA%B8%B0%2F%EC%9D%8C%EB%B0%98",
      lastmod: new Date().toISOString()
    },
    {
      loc: "https://ittem.vercel.app/product?category=%EB%8F%84%EC%84%9C",
      lastmod: new Date().toISOString()
    },
    {
      loc: "https://ittem.vercel.app/product?category=%EA%B3%B5%EA%B5%AC",
      lastmod: new Date().toISOString()
    },
    {
      loc: "https://ittem.vercel.app/product?category=%EC%8B%9D%ED%92%88",
      lastmod: new Date().toISOString()
    },
    {
      loc: "https://ittem.vercel.app/product?category=%EC%A0%84%EC%9E%90%EA%B8%B0%EA%B8%B0",
      lastmod: new Date().toISOString()
    },
    {
      loc: "https://ittem.vercel.app/product?category=%EA%B8%B0%ED%83%80",
      lastmod: new Date().toISOString()
    }
  ];

  const urls = [...products, ...staicUrls]
    .map((product) => {
      return `
      <url>
        <loc>${product.loc}</loc>
        <lastmod>${product.lastmod}</lastmod>
      </url>
    `;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>
  `;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}
