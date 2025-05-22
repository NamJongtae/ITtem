interface IProps {
  handleClickCloseBtn: () => void;
}

export default function ReviewModalBackDrop({ handleClickCloseBtn }: IProps) {
  return (
    <div
      onClick={handleClickCloseBtn}
      className="fixed bg-black bg-opacity-50 inset-0 z-30"
      role="modal-backdrop"
    />
  );
}
