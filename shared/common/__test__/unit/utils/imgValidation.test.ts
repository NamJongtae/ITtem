import { imgValidation } from "@/shared/common/utils/imgValidation";
import { toast } from "react-toastify";

// toast 함수 mocking
jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

describe("imgValidation", () => {
  const createFile = (name: string, size: number, type = "image/jpeg") => {
    const blob = new Blob(["a".repeat(size)], { type });
    return new File([blob], name, { type });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("유효한 이미지 파일이면 true를 반환합니다.", () => {
    const file = createFile("test.jpg", 1024 * 1024 * 5);
    expect(imgValidation(file)).toBe(true);
  });

  it("파일이 없으면 false를 반환합니다.", () => {
    expect(imgValidation(undefined as unknown as File)).toBe(false);
    expect(toast.warn).not.toHaveBeenCalled();
  });

  it("지원하지 않는 확장자면 false를 반환하고 toast를 호출합니다.", () => {
    const file = createFile("test.txt", 1024 * 100, "text/plain");
    expect(imgValidation(file)).toBe(false);
    expect(toast.warn).toHaveBeenCalledWith(
      "test.txt은(는)\n 지원하는 형식이 아닙니다."
    );
  });

  it("파일 이름이 길 경우 생략된 이름이 출력됩니다.", () => {
    const longName = "averylongfilenameexampleimage.txt";
    const file = createFile(longName, 1024 * 100, "text/plain");
    imgValidation(file);
    expect(toast.warn).toHaveBeenCalledWith(
      "averylongfilenameexa..." + "은(는)\n 지원하는 형식이 아닙니다."
    );
  });

  it("파일 크기가 10MB를 초과하면 false를 반환하고 경고를 표시합니다.", () => {
    const file = createFile("test.png", 1024 * 1024 * 11, "image/png");
    expect(imgValidation(file)).toBe(false);
    expect(toast.warn).toHaveBeenCalledWith(
      "크기를 초과하였습니다.(최대 10MB)"
    );
  });
});
