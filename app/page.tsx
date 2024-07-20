import HomePage from "@/components/home/home-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ITtem | 홈",
  openGraph: {
    title: "ITtem | 홈",
  },
};

export default async function Home() {
  return <HomePage />;
}
