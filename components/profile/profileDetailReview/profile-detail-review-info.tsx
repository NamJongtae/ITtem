import React from "react";
import dynamic from "next/dynamic";
const ReactStars = dynamic(() => import("react-stars"), {
  ssr: false,
  loading: () => <p>loading...</p>,
});

export default function ProfileDetailReviewInfo() {
  return (
    <>
      <div className="border p-3 rounded-md flex items-center justify-center">
        <span className="relative before:w-[1px] before:h-4 before:bg-black before:absolute before:-right-[7px] before:top-[6px]">
          평가 <span className="font-semibold">97%</span>
        </span>
        <div className="flex gap-1 items-center">
          <span className="ml-3">평점 </span>
          <ReactStars size={20} half value={5} color2="#fec323" edit={false}/>
          <span className="font-semibold">{5}</span>
        </div>
      </div>
      <ul className="flex flex-col gap-2 mt-5">
        <li className="w-full flex justify-between bg-gray-100 rounded-md py-2 px-4">
          <p>상품 정보와 실제 상품이 동일해요.</p>
          <span className="font-semibold text-gray-400">2</span>
        </li>
        <li className="w-full flex justify-between bg-gray-100 rounded-md py-2 px-4">
          <p>친절하고 좋아요.</p>
          <span className="font-semibold text-gray-400">2</span>
        </li>
        <li className="w-full flex justify-between bg-gray-100 rounded-md py-2 px-4">
          <p>배송이 빨라요.</p>
          <span className="font-semibold text-gray-400">2</span>
        </li>
        <li className="w-full flex justify-between bg-gray-100 rounded-md py-2 px-4">
          <p>잇톡 답변이 빨라요.</p>
          <span className="font-semibold text-gray-400">2</span>
        </li>
        <li className="w-full flex justify-between bg-gray-100 rounded-md py-2 px-4">
          <p>제품이 깔끔해요.</p>
          <span className="font-semibold text-gray-400">2</span>
        </li>
      </ul>
    </>
  );
}
