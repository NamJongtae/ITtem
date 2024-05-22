import Image from "next/image";

export default function ProductManageList() {
  return (
    <ul>
      <li className="flex gap-3 flex-col sm:flex-row sm:items-center sm:justify-between border-b py-5">
        <div className="flex gap-3 items-center">
          <Image
            className="w-32 h-32 object-cover object-center"
            src={
              "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt=""
            width={120}
            height={120}
          />
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex">
              <span className="inline-block w-16">상품명 </span>
              <span className="line-clamp-1"> 깨끗한 사용감 없는 가방</span>
            </div>
            <div>
              <span className="inline-block w-16">가격 </span>
              <span>200,000</span>원
            </div>
            <div>
              <span className="inline-block w-16">판매일 </span>
              <time>2024.03.24</time>
            </div>
            <div>
              <span className="inline-block w-16">진행상태 </span>
              <span>판매중 </span>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-end sm:flex-col gap-3 ">
          <button className="text-sm sm:text-base px-4 py-2 bg-red-400 text-white font-semibold betterhover:hover:bg-red-600">
            수정하기
          </button>
          <button className="text-sm sm:text-base px-4 py-2 bg-gray-400 text-white font-semibold betterhover:hover:bg-gray-600">
            삭제하기
          </button>
        </div>
      </li>
      
    </ul>
  );
}
