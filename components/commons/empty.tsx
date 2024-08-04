import Image from "next/image";

interface IProps {
  message: string;
  iconSize?: number;
  messageSize?: "xs" | "sm" | "base" | "lg" | "xl";
}

export default function Empty({ message, iconSize, messageSize }: IProps) {
  return (
    <div className="w-full mx-auto flex flex-col gap-3 justify-center items-center min-h-[300px]">
      <Image
        className={`${iconSize ? `w-[${iconSize}px] h-[${iconSize}px]` : "w-[60px] h-[60px]"} object-contain`}
        src={"/icons/empty-icon.svg"}
        alt="상품이 존재하지 않아요."
        width={iconSize ? iconSize : 60}
        height={iconSize ? iconSize : 60}
      />
      <p
        className={`whitespace-pre text-center text-${
          messageSize ? messageSize : "base"
        }`}
      >
        {message}
      </p>
    </div>
  );
}
