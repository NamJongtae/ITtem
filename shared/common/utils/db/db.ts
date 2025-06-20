import _mongoose, { connect } from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    promise: ReturnType<typeof connect> | null;
    conn: typeof _mongoose | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  const MONGODB_URI = process.env.NEXT_SECRET_MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("DB 접속 정보를 확인해주세요.");
  }
  if (cached.conn) {
    console.log("캐싱된 커넥션을 사용합니다.");
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false
    };
    cached.promise = connect(MONGODB_URI!, opts)
      .then((mongoose) => {
        console.log("DB 커넥션이 생성되었습니다.");
        return mongoose;
      })
      .catch((error) => {
        console.error("DB 커넥션에 실패했습니다.");
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
