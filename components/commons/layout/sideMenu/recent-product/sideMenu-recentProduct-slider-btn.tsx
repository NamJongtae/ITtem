import Image from "next/image";

interface IProps {
  handleClickNext: () => void;
  handleClickPrev: () => void;
  page: number;
  max: number;
}

export default function SideMenuRecentProductSliderBtn({
  handleClickNext,
  handleClickPrev,
  page,
  max,
}: IProps) {
  return (
    <div className="mt-3 mx-auto flex justify-center items-center gap-2">
      <button
        onClick={handleClickPrev}
        disabled={page === 0}
        className="border p-1 disabled:bg-gray-50"
      >
        <Image
          className="rotate-180 w-[8px] h-[8px]"
          src={"/icons/arrow_icon.svg"}
          alt="prev"
          width={8}
          height={8}
        />
      </button>
      <span className="inline-block text-xs mx-auto">
        {page + 1} / {max}
      </span>
      <button
        onClick={handleClickNext}
        disabled={page === max - 1}
        className="border p-1 disabled:bg-gray-50"
        aria-disabled={page === max - 1}
      >
        <Image
          className=" w-[8px] h-[8px]"
          src={"/icons/arrow_icon.svg"}
          alt="next"
          width={8}
          height={8}
        />
      </button>
    </div>
  );
}
