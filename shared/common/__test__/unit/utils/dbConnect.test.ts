import dbConnect from "@/shared/common/utils/db/db";
import mongoose from "mongoose";

jest.mock("mongoose", () => {
  const mockConnect = jest.fn(() => Promise.resolve({ connected: true }));
  return {
    connect: mockConnect,
    default: { connect: mockConnect }
  };
});

process.env.NEXT_SECRET_MONGODB_URI = "mongodb://localhost:3000/test";

describe("dbConnect 테스트", () => {
  afterEach(() => {
    jest.resetModules();
    (global as any).mongoose = undefined;
    jest.clearAllMocks();
  });

  it("정상적으로 DB에 연결되어야 합니다.", async () => {
    const conn = await dbConnect();

    expect(conn).toBeDefined();
    expect(mongoose.connect).toHaveBeenCalledTimes(1);
  });

  it("이미 연결된 경우 캐시를 사용해야 합니다.", async () => {
    const conn1 = await dbConnect();
    const conn2 = await dbConnect();

    expect(conn2).toBe(conn1);
    // 캐시가 있으므로 호출 X
    expect(mongoose.connect).toHaveBeenCalledTimes(0);
  });

  it("mongoose.connect가 실패하면 에러를 던져야 합니다.", async () => {
    jest.doMock("mongoose", () => {
      const mockConnect = jest.fn(() => Promise.reject(new Error("연결 실패")));
      return {
        connect: mockConnect,
        default: { connect: mockConnect }
      };
    });

    const { default: dbConnect } = await import("@/shared/common/utils/db/db");

    await expect(dbConnect()).rejects.toThrow("연결 실패");
  });

  it("환경변수가 없으면 에러가 발생해야 합니다.", async () => {
    delete process.env.NEXT_SECRET_MONGODB_URI;

    const { default: dbConnect } = await import("@/shared/common/utils/db/db");

    await expect(dbConnect()).rejects.toThrow("DB 접속 정보를 확인해주세요.");
  });
});
