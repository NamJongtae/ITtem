import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MyForm from "@/shared/common/components/MyForm";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

// DevTool 동적 import mock 처리
jest.mock("@hookform/devtools", () => ({
  DevTool: () => <div data-testid="dev-tool" />
}));

describe("MyForm 컴포넌트 테스트", () => {
  it("폼과 자식 요소가 렌더링됩니다.", () => {
    render(
      <MyForm onSubmit={jest.fn()}>
        <input name="testField" placeholder="테스트 입력" />
      </MyForm>
    );

    expect(screen.getByRole("form")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("테스트 입력")).toBeInTheDocument();
  });

  it("제출 시 onSubmit이 호출됩니다.", async () => {
    const handleSubmit: SubmitHandler<FieldValues> = jest.fn();

    render(
      <MyForm onSubmit={handleSubmit}>
        <button type="submit">제출</button>
      </MyForm>
    );

    const button = screen.getByRole("button", { name: "제출" });
    fireEvent.click(button);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it("DevTool이 렌더링됩니다.", () => {
    render(
      <MyForm onSubmit={jest.fn()}>
        <input name="testField" placeholder="테스트 입력" />
      </MyForm>
    );

    expect(screen.getByTestId("dev-tool")).toBeInTheDocument();
  });
});
