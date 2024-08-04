import Link from "next/link";

export default function UserInfoCardChangePasswordBtn() {
  return (
    <Link
      href={"/profile/passwordChange"}
      className="border py-2 px-4 w-full betterhover:hover:bg-gray-100 text-center"
      scroll={false}
    >
      비밀번호 변경
    </Link>
  );
}
