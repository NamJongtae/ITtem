interface IProps {
  closeModal: () => void;
}

export default function AddressModalBackdrop({ closeModal }: IProps) {
  return (
    <div
      onClick={closeModal}
      className="fixed bg-black bg-opacity-50 inset-0 z-40"
      role="modal-backdrop"
    />
  );
}
