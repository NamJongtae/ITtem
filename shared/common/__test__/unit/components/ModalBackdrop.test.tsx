import { render, screen, fireEvent } from "@testing-library/react";
import ModalBackDrop from "@/shared/common/components/ModalBackdrop";
import { useRouter } from "next/navigation";

jest.mock("next/navigation");

describe("ModalBackDrop 컴포넌트 테스트", () => {
  const backMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      back: backMock
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("backdrop이 정상적으로 렌더링됩니다.", () => {
    render(<ModalBackDrop />);

    const backdrop = screen.getByLabelText("back-drop");
    expect(backdrop).toBeInTheDocument();
  });

  it("backdrop 클릭 시 router.back()이 호출됩니다.", () => {
    render(<ModalBackDrop />);

    const backdrop = screen.getByLabelText("back-drop");
    fireEvent.click(backdrop);

    expect(backMock).toHaveBeenCalledTimes(1);
  });
});
