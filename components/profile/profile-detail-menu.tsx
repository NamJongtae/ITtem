import { ProfileMenu } from "./profile-page";

interface IProps {
  profileMenu: ProfileMenu;
  handleClickMenu: (menu: ProfileMenu) => void;
  uid?: string;
}

export default function ProfileDetailMenu({
  profileMenu,
  handleClickMenu,
  uid,
}: IProps) {
  return (
    <ul className="flex justify-between w-full h-full font-medium text-sm md:text-base">
      <li
        className={`${
          profileMenu === "판매상품" && "bg-gray-700 text-white"
        } border border-l-none border-b-black w-full h-full py-3 text-center`}
      >
        <button onClick={() => handleClickMenu("판매상품")}>판매상품</button>
      </li>
      <li
        className={`${
          profileMenu === "거래후기" && "bg-gray-700 text-white"
        } border border-l-0 border-b-black w-full h-full py-3 text-center`}
      >
        <button onClick={() => handleClickMenu("거래후기")} className="">
          거래후기
        </button>
      </li>
      {!uid && (
        <li
          className={`${
            profileMenu === "찜" && "bg-gray-700 text-white"
          } border border-l-0 border-b-black w-full h-full py-3 text-center`}
        >
          <button onClick={() => handleClickMenu("찜")} className="">
            찜
          </button>
        </li>
      )}
      <li
        className={`${
          profileMenu === "팔로잉" && "bg-gray-700 text-white"
        } border border-l-0 border-b-black w-full h-full py-3 text-center`}
      >
        <button onClick={() => handleClickMenu("팔로잉")} className="">
          팔로잉
        </button>
      </li>
      <li
        className={`${
          profileMenu === "팔로워" && "bg-gray-700 text-white"
        } border border-l-0 border-b-black w-full h-full py-3 text-center`}
      >
        <button onClick={() => handleClickMenu("팔로워")} className="">
          팔로워
        </button>
      </li>
    </ul>
  );
}
