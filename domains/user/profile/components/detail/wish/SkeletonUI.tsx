import ItemSkeltonUI from "./ItemSkeletonUI";

export default function SkeletonUI() {
  return (
    <>
      <div className="w-20 h-6 bg-gray-300 mb-5" />
      <ul className="grid grid-col-1 md:grid-cols-2 gap-3">
        {Array(8)
          .fill("")
          .map((_, index) => (
            <ItemSkeltonUI key={index} />
          ))}
        ;
      </ul>
    </>
  );
}
