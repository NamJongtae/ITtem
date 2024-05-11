import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";
const ReactStars = dynamic(() => import("react-stars"), {
  ssr: false,
  loading: () => <p>loading...</p>,
});

export default function ProfileDetailFollowList() {
  return (
    <ul className="grid gap-8 grid-cols-autoFill_180">
      <li className="rounded-md mx-auto">
        <div className="flex gap-3">
          <Image
            className="w-14 h-14 rounded-full bg-cover bg-center"
            src={
              "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
            }
            alt=""
            width={56}
            height={56}
          />
          <div className="flex flex-col">
            <span className="font-semibold">Jon</span>
            <ReactStars
              size={20}
              half
              value={5}
              color2="#fec323"
              edit={false}
            />
            <div className="mt-1">
              <span className="relative mr-4 text-sm font-medium before:w-[1px] before:h-3 before:absolute before:bg-gray-400 before:-right-[9px] before:top-1/2 before:-translate-y-1/2">
                상품 5
              </span>
              <span className="text-sm font-medium">평가 97%</span>
            </div>
            <span className="font-medium text-sm">팔로워 5</span>
          </div>
        </div>
        <button className="w-full max-w-[180px] border mt-3 py-2 px-4">
          + 팔로우
        </button>
      </li>
      <li className="rounded-md mx-auto">
        <div className="flex gap-3">
          <Image
            className="w-14 h-14 rounded-full bg-cover bg-center"
            src={
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt=""
            width={56}
            height={56}
          />
          <div className="flex flex-col">
            <span className="font-semibold">Mike</span>
            <ReactStars
              size={20}
              half
              value={5}
              color2="#fec323"
              edit={false}
            />
            <div className="mt-1">
              <span className="relative mr-4 text-sm font-medium before:w-[1px] before:h-3 before:absolute before:bg-gray-400 before:-right-[9px] before:top-1/2 before:-translate-y-1/2">
                상품 5
              </span>
              <span className="text-sm font-medium">평가 97%</span>
            </div>
            <span className="font-medium text-sm">팔로워 5</span>
          </div>
        </div>
        <button className="w-full max-w-[180px] border mt-3 py-2 px-4 betterhover:hover:bg-gray-100">
          + 팔로우
        </button>
      </li>
      <li className="rounded-md mx-auto">
        <div className="flex gap-3">
          <Image
            className="w-14 h-14 rounded-full bg-cover bg-center"
            src={
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt=""
            width={56}
            height={56}
          />
          <div className="flex flex-col">
            <span className="font-semibold">Jane</span>
            <ReactStars
              size={20}
              half
              value={5}
              color2="#fec323"
              edit={false}
            />
            <div className="mt-1">
              <span className="relative mr-4 text-sm font-medium before:w-[1px] before:h-3 before:absolute before:bg-gray-400 before:-right-[9px] before:top-1/2 before:-translate-y-1/2">
                상품 5
              </span>
              <span className="text-sm font-medium">평가 97%</span>
            </div>
            <span className="font-medium text-sm">팔로워 5</span>
          </div>
        </div>
        <button className="w-full max-w-[180px] border mt-3 py-2 px-4">
          + 팔로우
        </button>
      </li>
      <li className="rounded-md mx-auto">
        <div className="flex gap-3">
          <Image
            className="w-14 h-14 rounded-full bg-cover bg-center"
            src={
              "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt=""
            width={56}
            height={56}
          />
          <div className="flex flex-col">
            <span className="font-semibold">Mark</span>
            <ReactStars
              size={20}
              half
              value={5}
              color2="#fec323"
              edit={false}
            />
            <div className="mt-1">
              <span className="relative mr-4 text-sm font-medium before:w-[1px] before:h-3 before:absolute before:bg-gray-400 before:-right-[9px] before:top-1/2 before:-translate-y-1/2">
                상품 5
              </span>
              <span className="text-sm font-medium">평가 97%</span>
            </div>
            <span className="font-medium text-sm">팔로워 5</span>
          </div>
        </div>
        <button className="w-full max-w-[180px] border mt-3 py-2 px-4">
          + 팔로우
        </button>
      </li>
    </ul>
  );
}
