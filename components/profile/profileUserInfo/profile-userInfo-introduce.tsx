import Empty from "@/components/commons/Empty";

interface IProps {
  introuduce: string | undefined;
}
export default function ProfileUserInfoIntroduce({ introuduce }: IProps) {
  return (
    <div className="basis-2/3 h-full px-5">
      <h3 className="font-semibold border-b pb-3">소개글</h3>
      {introuduce ? (
        <p className="w-full h-full mx-auto max-h-[200px] md:max-h-[290px] mt-3 text-sm sm:text-base whitespace-pre-wrap break-keep  overflow-y-auto scrollbar">
          {introuduce}
        </p>
      ) : (
        <Empty message="소개글이 없어요." messageSize="sm" />
      )}
    </div>
  );
}
