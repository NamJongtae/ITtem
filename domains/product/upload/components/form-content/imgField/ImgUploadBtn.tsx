import useImgDragAndDrop from "../../../hooks/img-field/useImgDragAndDrop";

interface IProps {
  handleClickImgInput: () => void;
  handleDropImgUpload: (e: React.DragEvent<HTMLButtonElement>) => void;
}

export default function ImgUploadBtn({
  handleClickImgInput,
  handleDropImgUpload
}: IProps) {
  const {
    isActive,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop
  } = useImgDragAndDrop(handleDropImgUpload);

  return (
    <div className="flex-shrink-0 w-48 h-48">
      <button
        type="button"
        onDragEnter={handleDragStart}
        onDragLeave={handleDragEnd}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClickImgInput}
        className={`${
          isActive ? "bg-gray-100" : "bg-gray-50"
        } w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">이미지 업로드</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            지원형식 : SVG, PNG, JPG
          </p>
        </div>
      </button>
    </div>
  );
}
