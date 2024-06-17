import Image from "next/image";

interface IProps {
  closeModal: () => void;
}

export default function ChangePasswordModalCloseBtn({ closeModal }: IProps) {
  return (
    <button
      className="absolute top-3 right-3 bg-gray-500 p-2 rounded-full"
      onClick={closeModal}
      type="button"
    >
      <Image
        className="w-3 h-3"
        src={"/icons/x_icon.svg"}
        alt="닫기"
        width={20}
        height={20}
      />
    </button>
  );
}
