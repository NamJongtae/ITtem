import { renderHook, act, render, screen } from "@testing-library/react";
import { useFunnel } from "@/shared/common/hooks/useFunnel";

describe("useFunnel 훅 테스트", () => {
  const steps = ["Step1", "Step2", "Step3"];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("초기 currentStep은 Step1이어야 합니다.", () => {
    const { result } = renderHook(() => useFunnel(steps));

    expect(result.current.currentStep).toBe("Step1");
  });

  it("nextStepHandler를 호출하면 currentStep이 변경되어야 합니다.", () => {
    const { result, rerender } = renderHook(() => useFunnel(steps));

    act(() => {
      result.current.nextStepHandler();
    });

    rerender();
    expect(result.current.currentStep).toBe("Step2");

    act(() => {
      result.current.nextStepHandler();
    });

    rerender();
    expect(result.current.currentStep).toBe("Step3");
  });

  it("prevStepHandler를 호출하면 currentStep이 이전 값으로 변경되어야 합니다.", () => {
    const { result, rerender } = renderHook(() => useFunnel(steps));

    act(() => {
      result.current.nextStepHandler(); // Step2
    });

    act(() => {
      result.current.nextStepHandler(); // Step3
    });

    act(() => {
      result.current.prevStepHandler(); // Step2
    });

    rerender();
    expect(result.current.currentStep).toBe("Step2");
  });

  it("stepIndex가 0일 때 prevStepHandler 호출해도 변하지 않아야 합니다.", () => {
    const { result, rerender } = renderHook(() => useFunnel(steps));

    act(() => {
      result.current.prevStepHandler();
    });

    rerender();
    expect(result.current.currentStep).toBe("Step1");
  });

  it("stepIndex가 마지막일 때 nextStepHandler 호출해도 변하지 않아야 합니다.", () => {
    const { result, rerender } = renderHook(() => useFunnel(steps));

    act(() => {
      result.current.nextStepHandler(); // Step2
    });

    act(() => {
      result.current.nextStepHandler(); // Step3
    });

    act(() => {
      result.current.nextStepHandler();
    });

    rerender();
    expect(result.current.currentStep).toBe("Step3");
  });

  it("Funnel은 currentStep에 해당하는 Step만 렌더링해야 합니다.", () => {
    const TestComponent = () => {
      const { Funnel, Step, currentStep, nextStepHandler } = useFunnel(steps);

      return (
        <>
          <button onClick={nextStepHandler}>다음</button>
          <div data-testid="current-step">{currentStep}</div>
          <Funnel>
            <Step name="Step1">첫 번째</Step>
            <Step name="Step2">두 번째</Step>
            <Step name="Step3">세 번째</Step>
          </Funnel>
        </>
      );
    };

    render(<TestComponent />);

    // 초기 상태는 Step1
    expect(screen.getByText("첫 번째")).toBeInTheDocument();
    expect(screen.queryByText("두 번째")).not.toBeInTheDocument();

    // 버튼 클릭으로 스텝 전환
    act(() => {
      screen.getByText("다음").click();
    });

    expect(screen.getByText("두 번째")).toBeInTheDocument();
    expect(screen.queryByText("첫 번째")).not.toBeInTheDocument();
  });
});
