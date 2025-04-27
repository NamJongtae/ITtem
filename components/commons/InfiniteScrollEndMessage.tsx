import React from "react";

export default function InfiniteScrollEndMessage({
  hasNextPage,
  data,
  message = "더 이상 데이터가 존재하지 않습니다."
}: {
  hasNextPage: boolean;
  data: unknown[] | undefined;
  message?: string;
}) {
  return data && data.length > 0 && !hasNextPage ? (
    <div className="flex justify-center items-center my-8 border-b mx-8">
      <p className="absolute text-center text-xs sm:text-sm text-gray-400 bg-white px-4 sm:px-8">
        {message}
      </p>
    </div>
  ) : null;
}
