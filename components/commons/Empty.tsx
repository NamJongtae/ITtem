import Image from "next/image";

interface IProps {
  message: string;
  iconSize?: number;
  messageSize?: "xs" | "sm" | "base" | "lg" | "xl";
}

export default function Empty({ message,iconSize, messageSize }: IProps) {
  return (
    <div className="w-full mx-auto flex flex-col gap-3 justify-center items-center min-h-[300px]">
      <Image
        src={"/icons/empty_icon.svg"}
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
