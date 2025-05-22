import Image from "next/image";

interface IProps {
  closeModal: () => void;
}

export default function AddressModalCloseBtn({ closeModal }: IProps) {
  return (
    <button
      type="button"
      onClick={closeModal}
      className="absolute top-5 right-5 p-1"
    >
      <Image
        src={
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj4KICAgIDxwYXRoIGZpbGw9IiMxRTFEMjkiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTExLjQxNCAxMGw2LjI5My02LjI5M2ExIDEgMCAxIDAtMS40MTQtMS40MTRMMTAgOC41ODUgMy43MDcgMi4yOTNhMSAxIDAgMCAwLTEuNDE0IDEuNDE0bDYuMjkzIDYuMjkyLTYuMjkzIDYuMjkzYTEgMSAwIDEgMCAxLjQxNCAxLjQxNEwxMCAxMS40MTNsNi4yOTMgNi4yOTNhLjk5Ny45OTcgMCAwIDAgMS40MTQgMCAuOTk5Ljk5OSAwIDAgMCAwLTEuNDE0TDExLjQxNCAxMHoiLz4KPC9zdmc+Cg=="
        }
        alt="닫기"
        width={20}
        height={20}
      />
    </button>
  );
}
