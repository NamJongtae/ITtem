const mongoose = require("mongoose");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://ittem.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: [
    "/opengraph-image.png",
    "/opengraph-image.png",
    "/profile/edit",
    "/refresh-token",
    "/product/upload",
    "/profile/passwordChange",
    "/session-expired",
    "/chat"
  ],

  additionalPaths: async () => {
    try {
      await mongoose.connect(process.env.NEXT_SECRET_MONGODB_URI);
      const productSchema = new mongoose.Schema({});
      const Product =
        mongoose.models?.Product || mongoose.model("Product", productSchema);
      const products = await Product.find({}, "_id").lean();

      const productsPath = products.map((p) => ({
        loc: `/product/${p._id.toString()}`,
        lastmod: new Date().toISOString()
      }));

      const manualPaths = [
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
          loc: "https://ittem.vercel.app/product?category=%EC%95%85%EA%B8%B0%2F%EC%9D%8C%EB%B0%98C",
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
        // 원하는 경로 추가
      ];
      return [...productsPath, ...manualPaths];
    } catch (error) {
      console.error(error);
    } finally {
      await mongoose.disconnect();
    }
  }
};
