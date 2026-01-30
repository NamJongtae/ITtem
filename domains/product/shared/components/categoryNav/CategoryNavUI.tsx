"use client";

import { CATEGORY } from "@/domains/product/shared/constants/constants";
import Image from "next/image";
import HomeIcon from "@/public/icons/home-icon.svg";

interface IPorops {
  currentCategory: string;
  className?: string;
}

export default function CategoryNavUI({ className, currentCategory }: IPorops) {
  return (
    <nav className={`flex self-start ${className ? className : ""}`}>
      <ol className="inline-flex items-center">
        <li className="inline-flex items-center">
          <HomeIcon className="w-4 h-4 stroke-black fill-black mr-1" />
          중고거래
        </li>
        <li>
          <div className="flex items-center">
            <Image
              className="mx-2 object-contain w-[10px] h-[12px]"
              src={"/icons/arrow-icon.svg"}
              alt=""
              width={15}
              height={19}
            />
            <span className="text-gray-700">
              {CATEGORY.includes(currentCategory || "")
                ? currentCategory
                : "전체"}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
}
