export default function PopularProductListSkeletonUI() {
  return (
    <div className="flex gap-[30px] w-full h-[340px] animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex-1 w-full h-full bg-gray-200" />
      ))}
    </div>
  );
}
