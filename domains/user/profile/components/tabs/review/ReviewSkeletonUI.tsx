import ItemSkeletonUI from "./ItemSkeletonUI";

interface IProps {
  listCount?: number;
}
export default function ReviewSkeletonUI({ listCount = 10 }: IProps) {
  return (
    <div className="animate-pulse">
      <div className="border h-14 rounded-md flex items-center justify-center bg-gray-200 mb-5" />
      {Array(5)
        .fill("")
        .map((_, index) => (
          <div
            className="w-full h-10 flex justify-between bg-gray-200 rounded-md mt-2"
            key={index}
          />
        ))}

      <ul className="flex flex-col gap-5 mt-12">
        {Array(listCount)
          .fill("")
          .map((_, index) => (
            <ItemSkeletonUI key={index} />
          ))}
      </ul>
    </div>
  );
}
