import useSigninLinks from "@/hooks/signin/useSigninLinks";
import Link from "next/link";

interface IProps {
  isModal?: boolean;
}

export default function SigninLinks({ isModal }: IProps) {
  const { handleBackClick } = useSigninLinks();

  return (
    <div className="flex justify-end gap-3 items-center mb-5">
      <div className="relative flex">
        <Link
          className="text-xs"
          href={"/signup"}
          onClick={isModal ? (e) => handleBackClick(e, "/signup") : undefined}
        >
          회원가입
        </Link>
        <div className="absolute w-[1px] h-3 bg-gray-400 top-[3px] -right-[7px]" />
      </div>

      <Link
        className="text-xs"
        href={"/findpassword"}
        onClick={
          isModal ? (e) => handleBackClick(e, "/findpassword") : undefined
        }
      >
        비밀번호찾기
      </Link>
    </div>
  );
}
