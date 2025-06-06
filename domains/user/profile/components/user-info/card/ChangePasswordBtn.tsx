import Link from "next/link";

export default function ChangePasswordBtn() {
  return (
    <Link
      href={"/profile/change-password"}
      className="border py-2 px-4 w-full betterhover:hover:bg-gray-100 text-center"
      scroll={false}
      prefetch={false}
    >
      비밀번호 변경
    </Link>
  );
}
