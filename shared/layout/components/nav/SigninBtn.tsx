import Link from "next/link";

export default function SigninBtn() {
  return (
    <>
      <Link
        href="/signin"
        className="relative pb-1 hidden md:block underline-offset-2 betterhover:hover:underline before:bg-gray-400 before:absolute before:h-[13px] before:w-[1px] before:-right-[6px] before:top-[5px]"
      >
        로그인
      </Link>
      <Link
        href="/signup"
        className="pb-1 hidden md:block underline-offset-2 betterhover:hover:underline"
      >
        회원가입
      </Link>
    </>
  );
}
