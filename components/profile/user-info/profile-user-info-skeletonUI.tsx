interface IProps {
  isMyProfile?: boolean;
}

export default function ProfileUserInfoSkeletonUI({ isMyProfile }: IProps) {
  return (
    <div className="mt-5 max-w-[1024px] px-4 md:px-8 mx-auto">
      <div className="flex flex-col gap-5 md:flex-row border py-5 px-4 animate-pulse">
        <div className="relative flex flex-col gap-3 justify-center items-start basis-1/3 before:hidden before:md:block before:absolute before:bg-gray-200 before:top-0 before:-right-[10px] before:w-[1px] before:h-full">
          {/* 프로필 이미지 */}
          <div className="w-24 h-24 rounded-full bg-gray-300/60 mx-auto" />

          {/* 닉네임 */}
          <div className="w-24 h-4 bg-gray-300/60 rounded mx-auto" />

          {/* 버튼/정보 */}
          <div className="flex flex-col items-center gap-3 w-full max-w-36 mx-auto">
            {/* 팔로우 정보 */}
            <div className="flex flex-row w-full gap-3">
              <div className="w-32 h-12 bg-gray-300/60 rounded" />
              <div className="w-32 h-12 bg-gray-300/60 rounded" />
            </div>

            {/* 별점 */}
            <div className="w-28 h-4 bg-gray-300/60 rounded" />

            {/* 판매 정보 */}
            <div className="w-32 h-4 bg-gray-300/60 rounded" />

            {/* 판매 정보 */}
            <div className="w-24 h-4 bg-gray-300/60 rounded" />

            {/* 버튼 */}
            <div className="w-32 h-10 bg-gray-300/60 rounded mt-2" />
            {isMyProfile && <div className="w-32 h-10 bg-gray-300/60 rounded mt-2" />}
          </div>
        </div>

        {/* 오른쪽: Introduce*/}
        <div className="basis-2/3 h-full px-5 flex flex-col">
          <div className="h-5 bg-gray-300/60 rounded w-12 mb-3" />
          <div className="h-5 w-full border-t"></div>

          {/* 소개글 텍스트 */}
          <div className="flex-1 space-y-3 overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-300/60 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
