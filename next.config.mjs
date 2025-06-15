import { withSentryConfig } from "@sentry/nextjs";
import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"]
    });
    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js"
        }
      }
    }
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      },
      {
        protocol: "http",
        hostname: "k.kakaocdn.net"
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com"
      }
    ]
  }
};
const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true"
})(nextConfig);

export default withSentryConfig(
  withSentryConfig(withBundleAnalyzerConfig, {
    org: "main-pg",
    project: "ittem",
    authToken: process.env.SENTRY_AUTH_TOKEN,
    silent: false,
    widenClientFileUpload: true,
    disableLogger: true,
    automaticVercelMonitors: true,
    sourcemaps: {
      disable: true
    }
  }),
  {
    // 아래는 Sentry Webpack 플러그인 옵션
    org: "main-pg", // Sentry 조직 슬러그
    project: "ittem", // Sentry 프로젝트 슬러그

    // CI 환경에서만 로그 출력 (로컬에서는 출력 X)
    silent: !process.env.CI,

    widenClientFileUpload: true, // 더 많은 소스맵 업로드

    disableLogger: true, // Sentry 로거 번들에서 제거

    automaticVercelMonitors: true // Vercel Cron 자동 모니터링
  }
);
