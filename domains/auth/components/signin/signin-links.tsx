import useSigninLinkHandler from '../../hooks/signin/useSigninLinkHandler';
import Link from "next/link";

interface IProps {
  isModal?: boolean;
}

export default function SigninLinks({ isModal }: IProps) {
  const { handleLinkClick } = useSigninLinkHandler();

  return (
    <div className="flex justify-end gap-3 items-center mb-5">
      <div className="relative flex">
        <Link
          className="text-xs"
          href={"/signup"}
          onClick={isModal ? (e) => handleLinkClick(e, "/signup") : undefined}
        >
          회원가입
        </Link>
        <div className="absolute w-[1px] h-3 bg-gray-400 top-[3px] -right-[7px]" />
      </div>

      <Link
        className="text-xs"
        href={"/find-password"}
        onClick={
          isModal ? (e) => handleLinkClick(e, "/find-password") : undefined
        }
      >
        비밀번호찾기
      </Link>
    </div>
  );
}
