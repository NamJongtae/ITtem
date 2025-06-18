const nextJest = require("next/jest"); // Next.js 프로젝트에서 Jest를 사용할 수 있도록 도와주는 함수

const createJestConfig = nextJest({
  dir: "./" // Next.js 앱의 루트 디렉토리 설정
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom", // DOM 환경에서 테스트
  setupFilesAfterEnv: ["<rootDir>/jest.setup.tsx"], // 테스트 환경 설정 파일
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1" // 절대 경로 매핑
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest" // TypeScript 파일 인식
  }
};

module.exports = createJestConfig(customJestConfig);
