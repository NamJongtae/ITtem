import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// 파이어베이스 앱 초기화/설정 (이미 초기화되어있으면 기존 설정 사용)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const getFirestoreDB = async () => {
  const { getFirestore } = await import("firebase/firestore");
  return getFirestore(app);
};

export const getRealtimeDB = async () => {
  const { getDatabase } = await import("firebase/database");
  return getDatabase(app);
};

export const getStorageInstance = async () => {
  const { getStorage } = await import("firebase/storage");
  return getStorage(app);
};
