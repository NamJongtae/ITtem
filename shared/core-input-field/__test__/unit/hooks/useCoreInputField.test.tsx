import { renderHook, act, fireEvent, render } from "@testing-library/react";
import React from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  UseFormReturn
} from "react-hook-form";
import useCoreInputField from "@/shared/core-input-field/hooks/useCoreInputField";

type Rendered = {
  field: ReturnType<typeof useCoreInputField>;
  methods: UseFormReturn;
};

type SpyTargets = Partial<{
  clearErrors: true;
  setValue: true;
}>;

function renderUseCoreInputField(params: any, spies?: SpyTargets) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm({ mode: "onChange" });

    if (spies?.clearErrors) jest.spyOn(methods, "clearErrors");
    if (spies?.setValue) jest.spyOn(methods, "setValue");

    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  return renderHook<Rendered, void>(
    () => {
      const field = useCoreInputField(params);
      const methods = useFormContext();
      return { field, methods };
    },
    { wrapper: Wrapper }
  );
}

describe("useCoreInputField 훅 테스트", () => {
  it("onChange와 onBlur 핸들러가 정상적으로 동작하는지 확인합니다.", () => {
    const handleChange = jest.fn();
    const handleBlur = jest.fn();

    const Wrapper = ({ children }: { children: React.ReactNode }) => {
      const methods = useForm({ mode: "onChange" });
      return <FormProvider {...methods}>{children}</FormProvider>;
    };

    const Input = () => {
      const { ref, rest } = useCoreInputField({
        inputName: "email",
        inputOnChange: handleChange,
        inputOnBlur: handleBlur
      });

      return (
        <input
          name="email"
          ref={ref}
          onChange={rest.onChange}
          onBlur={rest.onBlur}
        />
      );
    };

    const { getByRole } = render(<Input />, { wrapper: Wrapper });
    const input = getByRole("textbox");

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.blur(input);

    expect(handleChange).toHaveBeenCalled();
    expect(handleBlur).toHaveBeenCalled();
  });

  it("값 설정 후 resetInput이 값을 초기화하는지 확인합니다.", () => {
    const { result } = renderUseCoreInputField({ inputName: "username" });

    act(() => {
      result.current.methods.setValue("username", "user1");
    });

    expect(result.current.field.value).toBe("user1");

    act(() => {
      result.current.field.resetInput();
    });

    expect(result.current.field.value).toBe("");
  });

  it("resetInput이 clearErrors와 setValue를 호출하는지 확인합니다.", () => {
    const { result } = renderUseCoreInputField(
      { inputName: "username" },
      { clearErrors: true, setValue: true }
    );

    act(() => {
      result.current.field.resetInput();
    });

    expect(result.current.methods.clearErrors).toHaveBeenCalledWith("username");
    expect(result.current.methods.setValue).toHaveBeenCalledWith(
      "username",
      "",
      {
        shouldDirty: true
      }
    );
  });

  it("유효성 검사 옵션을 전달했을 때 validate 함수가 실행되는지 확인합니다.", () => {
    const validateMock = jest.fn((val) => val === "abc" || "잘못된 값입니다");

    const { result } = renderUseCoreInputField({
      inputName: "code",
      inputValidate: validateMock
    });

    act(() => {
      result.current.methods.setValue("code", "xyz", { shouldValidate: true });
    });

    expect(validateMock).toHaveBeenCalledWith("xyz", { code: "xyz" });
  });

  it("필수 입력값 설정 시 에러 메시지가 출력되는지 확인합니다.", async () => {
    const requiredMsg = "이 필드는 필수입니다.";

    const { result } = renderUseCoreInputField({
      inputName: "password",
      inputRequired: requiredMsg
    });

    await act(async () => {
      await result.current.methods.trigger("password");
    });

    expect(result.current.field.error?.message).toBe(requiredMsg);
  });

  it("패턴 검증 설정 시 에러 메시지가 출력되는지 확인합니다.", async () => {
    const { result } = renderUseCoreInputField({
      inputName: "nickname",
      inputPattern: {
        value: /^[A-Za-z]+$/,
        message: "영문만 입력하세요."
      }
    });

    await act(async () => {
      result.current.methods.setValue("nickname", "123", {
        shouldValidate: true
      });
    });

    expect(result.current.field.error?.message).toBe("영문만 입력하세요.");
  });
});
