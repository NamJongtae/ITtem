interface IProps {
  reviewContent: number | undefined;
}

export default function ReviewContent({ reviewContent }: IProps) {
  return (
    <>
      <h3 className="sr-only">리뷰 내용</h3>
      <p className=" w-full max-h-[200px] border rounded-md py-3 pl-4 pr-8 text-sm bg-gray-100 whitespace-pre-wrap overflow-y-auto mt-2">
        {reviewContent}
      </p>
    </>
  );
}
