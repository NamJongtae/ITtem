import Image from 'next/image';
import Link from 'next/link';

export default function ProductDeatilSeller() {
  return (
    <section className="basis-1/3">
      <h3 className="text-gray-600 text-xl font-medium">판매자 정보</h3>
      <hr className="h-px border-0 bg-gray-500 my-3" />
      <Link href="#" className="inline-flex items-center gap-4 rounded-md p-3 ">
        <Image
          className="inline-block h-14 w-14 cursor-pointer rounded-full object-cover object-center mr-1"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          alt="판매자"
          width={56}
          height={56}
        />
        <div>
          <span>판매자</span>
          <span className="block text-gray-500 text-sm">평가 : 97%</span>
        </div>
        <button className="border py-1 px-2 text-sm betterhover:hover:bg-gray-100">
          + 팔로우
        </button>
      </Link>
      <div className="mt-2">
        <h4>판매자의 다른 상품</h4>
        <hr className="border-0 h-px mt-2 mb-5 bg-gray-200" />
        <ul className="grid grid-cols-3 gap-3">
          {["", "", "", "", "", ""].map((_,index) => (
            <li
              key={index}
              data-item={"10,000"}
              className={
                "relative betterhover:hover:opacity-50 transition-all group ease-in duration-200"
              }
            >
              <Link className="w-full h-full" href={"#"}>
                <Image
                  className="mx-auto w-full h-full"
                  src="https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width={316}
                  height={316}
                  alt="상품"
                />
                <div className="absolute bottom-0 bg-black bg-opacity-20 w-full text-white h-8 text-[14px] inline-flex justify-center items-center">
                  <span>10,000</span> 원
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={"#"}
          className="inline-flex mt-5 border p-2 text-sm ml-[50%] -translate-x-[50%] rounded-sm betterhover:hover:bg-gray-100"
        >
          <span className="text-red-500">30개</span>의 상품 더보기{" "}
          <svg
            className={"-mr-1 h-5 w-5 text-gray-400 -rotate-90"}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
