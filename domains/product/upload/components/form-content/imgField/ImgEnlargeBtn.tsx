import Image from "next/image";

interface IProps {
  handleOpenModal: () => void;
}

export default function ImgEnlargeBtn({ handleOpenModal }: IProps) {
  return (
    <button
      type="button"
      onClick={handleOpenModal}
      className="inline-flex items-center gap-1 border border-gray-400 rounded-sm bg-whtie px-2 py-1 betterhover:hover:bg-gray-100"
    >
      <Image
        src="/icons/search-icon.svg"
        alt="이미지 확대"
        width={20}
        height={20}
      />
      이미지 확대
    </button>
  );
}
