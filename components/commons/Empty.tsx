import Image from "next/image";

interface IProps {
  message: string;
}

export default function Empty({ message }: IProps) {
  return (
    <div className="w-full mx-auto  flex flex-col gap-3 justify-center items-center min-h-[300px]">
      <Image
        src={"/icons/empty_icon.svg"}
        alt="상품이 존재하지 않아요."
        width={60}
        height={60}
      />
      <p className='whitespace-pre text-center'>{message}</p>
    </div>
  );
}
