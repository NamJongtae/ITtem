import Image from "next/image";
import React from "react";
import { ProfileMenu } from "../profile-page";
import dynamic from "next/dynamic";
const ReactStars = dynamic(() => import("react-stars"), {
  ssr: false,
  loading: () => <p>loading...</p>,
});

interface IProps {
  handleClickMenu: (menu: ProfileMenu) => void;
  uid?: string;
}

export default function ProfileUserInfoCard({ handleClickMenu, uid }: IProps) {

  return (
    <div className="relative flex flex-col gap-3 justify-center items-start basis-1/3 before:hidden before:md:block before:absolute before:bg-gray-200 before:top-0 before:-right-[10px] before:w-[1px] before:h-full">
      <Image
        className="w-24 h-24 object-cover object-center rounded-full mx-auto"
        src={
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
        }
        alt=""
        width={100}
        height={100}
      />

      <div className="flex flex-col items-center gap-3 w-full max-w-36 mx-auto">
        <span className="font-bold text-lg">Jon123</span>
        <div className="flex gap-5 text-sm font-medium">
          <button
            onClick={() => handleClickMenu("팔로잉")}
            className="relative font-semibold before:absolute before:bg-gray-400 before:top-1/2 before:-translate-y-1/2 before:-right-[10px] before:w-[1px] before:h-7"
          >
            <span>팔로잉</span>
            <span className="block w-full text-center">10</span>
          </button>
          <button
            onClick={() => handleClickMenu("팔로워")}
            className="font-semibold"
          >
            <span>팔로워</span>
            <span className="block w-full text-center">10</span>
          </button>
        </div>
        <ReactStars size={20} half value={5} color2="#fec323" edit={false} />
        <div className="text-sm font-medium">
          <button
            onClick={() => handleClickMenu("판매상품")}
            className="relative mr-4 before:w-[1px] before:h-3 before:absolute before:bg-gray-400 before:-right-[9px] before:top-1/2 before:-translate-y-1/2"
          >
            상품 5개
          </button>

          <button onClick={() => handleClickMenu("거래후기")}>평가 97%</button>
        </div>
        <span className="text-sm">상품판매 5회</span>
        {uid ? (
          <button className="border py-2 px-4 w-full betterhover:hover:bg-gray-100">
            + 팔로우
          </button>
        ) : (
          <>
            <button
              className="border py-2 px-4 w-full betterhover:hover:bg-gray-100"
            >
              프로필 수정
            </button>
            <button
              className="border py-2 px-4 w-full betterhover:hover:bg-gray-100"
            >
              비밀번호 변경
            </button>
          </>
        )}
      </div>
    </div>
  );
}
