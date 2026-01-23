const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// 지연 초기화
let appPromise: Promise<any> | null = null;

const getFirebaseApp = async () => {
  if (appPromise) return appPromise;

  appPromise = (async () => {
    const { getApp, getApps, initializeApp } = await import("firebase/app");
    // 이미 초기화 되어 있는 경우 기존 설정 사용
    return !getApps().length ? initializeApp(firebaseConfig) : getApp();
  })();

  return appPromise;
};

export const getFirestoreDB = async () => {
  const app = await getFirebaseApp();
  const { getFirestore } = await import("firebase/firestore");
  return getFirestore(app);
};

export const getRealtimeDB = async () => {
  const app = await getFirebaseApp();
  const { getDatabase } = await import("firebase/database");
  return getDatabase(app);
};

export const getStorageInstance = async () => {
  const app = await getFirebaseApp();
  const { getStorage } = await import("firebase/storage");
  return getStorage(app);
};
