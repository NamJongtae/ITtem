import CloseIcon from "@/public/icons/x_icon.svg";

interface IProps {
  closeModal: () => void;
}

export default function ProfileEditCloseBtn({ closeModal }: IProps) {
  return (
    <button
      className="absolute top-3 right-3 bg-gray-500 p-2 rounded-full"
      onClick={closeModal}
      type="button"
    >
      <CloseIcon className="fill-black w-3 h-3" />
    </button>
  );
}
