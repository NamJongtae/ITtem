"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IProps {
  error: Error;
}

export default function Error({ error }: IProps) {
  const router = useRouter();
  const handleClickBack = () => {
    router.back();
  };

  useEffect(() => {
    if (error) {
      if (process.env.NODE_ENV === "development") {
        console.log(error);
      }
    }
  }, [error]);

  return (
    <div className="h-[calc(100vh-165px)] md:h-[calc(100vh-179px)] w-full px-16 md:px-0 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8">
        <Image
          className="w-[60px] md:w-[80px]"
          src={"/icons/error-icon.svg"}
          alt=""
          width={80}
          height={80}
        />
        <p className="text-4xl md:text-5xl font-bold tracking-wider text-gray-500 mt-4">
          Error
        </p>
        <p className="text-gray-500 mt-6 pb-4 text-center text-base md:text-lg leading-7 md:leading-8 whitespace-pre border-b-2">
          {
            "죄송합니다.\n알 수 없는 문제가 발생하였습니다.\n잠시 후 다시 시도해주세요."
          }
        </p>
        <button
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-4 rounded transition duration-150"
          title="Return Home"
          onClick={handleClickBack}
        >
          <Image
            src={"/icons/back-icon.svg"}
            alt={"이전 페이지"}
            width={20}
            height={20}
          />
          <span>이전 페이지</span>
        </button>
      </div>
    </div>
  );
}
