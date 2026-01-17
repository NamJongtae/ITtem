// eslint.config.mjs
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
  // ✅ Next 권장 규칙(Flat Config 지원 preset)
  ...nextVitals,
  ...nextTs,

  // ✅ .eslintignore 대체
  globalIgnores([
    "**/node_modules/**",
    "**/.next/**",
    "**/out/**",
    "**/build/**",
    "**/dist/**",
    "**/coverage/**",
    "**/next-env.d.ts",
    "**/postcss.config.*",
    "**/tailwind.config.*",
    "**/next-sitemap.config.*",
    "**/next.config.*",
    "**/jest.config.*"
  ]),

  // ✅ 너가 쓰던 커스텀 룰
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "spaced-comment": "error",
      "no-duplicate-imports": "error",
      "react/prop-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-useless-catch": "off"
    }
  },

  // ✅ 타입정보 필요한 TS 설정(프로젝트 기반)
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname
      }
    }
  }
]);
