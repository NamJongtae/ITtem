import Spinner from "@/components/commons/spinner";
import Image from "next/image";
import React from "react";

export default function ChatRoomLoading() {
  return (
    <div className="relative z-0 w-full max-w-[calc(1024px-32px)] md:max-w-[calc(1024px-64px)] mx-auto h-[calc(100vh-176px-53px)] md:h-[calc(100vh-126px-53px)] border-0 md:border-l md:border-r overflow-hidden">
      {/* 채팅 헤더 */}
      <div className="flex items-center justify-between border-b px-5 py-3 min-h-[65px]">
        <div className="flex gap-3 items-center">
          {
            <Image
              className="rotate-180"
              src={"/icons/arrow-icon.svg"}
              alt=""
              width={14}
              height={20}
            />
          }

          <div className="w-32 h-10 bg-gray-200 animate-pulse" />
        </div>
        <Image src="/icons/dots-icon.svg" alt="" width={20} height={20} />
      </div>

      {/* 채팅 메세지 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -transform-y-1/2">
        <div className="flex flex-col justify-center items-center">
          <Spinner />
          <p>채팅 불러오는 중...</p>
        </div>
      </div>
    </div>
  );
}
