import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
const ReactStars = dynamic(() => import("react-stars"), {
  ssr: false,
  loading: () => <p>loading...</p>,
});

export default function ProfileDetailReviewList() {
  return (
    <ul className="mt-12">
      <li className="flex gap-4 border-b pb-5  px-5">
        <Image
          className="rounded-full w-14 h-14 object-cover object-center"
          src={
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt=""
          width={56}
          height={56}
        />
        <div>
          <div className="flex flex-col mb-3">
            <span>Mike</span>
            <ReactStars
              size={20}
              half
              value={5}
              color2="#fec323"
              edit={false}
            />
          </div>
          <Link
            href={"#"}
            className="inline line-clamp-1 border py-1 px-2 text-sm text-gray-500 mt-2 betterhover:hover:bg-gray-100"
          >
            깨끗한 사용감 없는 가방
          </Link>

          <div className="flex flex-col">
            <p className="mt-3 whitespace-pre-line">
              {"잘 받았습니다.\n감사합니다."}
            </p>
            <ul className="flex text-xs mt-5 gap-3 flex-wrap">
              <li>
                <p className="bg-gray-100 py-1 px-2 rounded-md">
                  상품이 설명과 동일해요.
                </p>
              </li>
              <li>
                <p className="bg-gray-100 py-1 px-2 rounded-md">
                  잇톡 답변이 빨라요.
                </p>
              </li>
              <li>
                <p className="bg-gray-100 py-1 px-2 rounded-md">
                  배송이 빨라요.
                </p>
              </li>
              <li>
                <p className="bg-gray-100 py-1 px-2 rounded-md">
                  친절하고 좋아요.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  );
}
