import { renderHook, act, fireEvent, render } from "@testing-library/react";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import useCoreInputField from "@/shared/core-input-field/hooks/useCoreInputField";
import React from "react";

const renderUseCoreInputField = (params: any) => {
  let formMethods: UseFormReturn; // 외부에서 접근하기 위해 선언

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    formMethods = useForm({ mode: "onChange" });
    return <FormProvider {...formMethods}>{children}</FormProvider>;
  };

  const { result } = renderHook(() => useCoreInputField(params), {
    wrapper: Wrapper
  });

  return { result, formMethods: formMethods! };
};

describe("useCoreInputField 훅 테스트", () => {
  it("onChange와 onBlur 핸들러가 정상적으로 동작하는지 확인합니다.", () => {
    const handleChange = jest.fn();
    const handleBlur = jest.fn();

    const { result } = renderUseCoreInputField({
      inputName: "email",
      inputOnChange: handleChange,
      inputOnBlur: handleBlur
    });

    const Input = () => (
      <input
        name="email"
        ref={result.current.ref}
        onChange={result.current.rest.onChange}
        onBlur={result.current.rest.onBlur}
      />
    );

    const { getByRole } = render(<Input />);
    const input = getByRole("textbox");

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.blur(input);

    expect(handleChange).toHaveBeenCalled();
    expect(handleBlur).toHaveBeenCalled();
  });

  it("값 설정 후 resetInput이 값을 초기화하는지 확인합니다.", async () => {
    const { result, formMethods } = renderUseCoreInputField({
      inputName: "username"
    });

    await act(() => {
      formMethods.setValue("username", "user1");
    });

    expect(result.current.value).toBe("user1");

    act(() => {
      result.current.resetInput();
    });

    expect(result.current.value).toBe("");
  });

  it("resetInput이 clearErrors와 setValue를 호출하는지 확인합니다.", () => {
    let formMethods!: UseFormReturn;
    let clearErrorsSpy!: jest.SpiedFunction<UseFormReturn["clearErrors"]>;
    let setValueSpy!: jest.SpiedFunction<UseFormReturn["setValue"]>;

    const Wrapper = ({ children }: { children: React.ReactNode }) => {
      formMethods = useForm({ mode: "onChange" });
      clearErrorsSpy = jest.spyOn(formMethods, "clearErrors");
      setValueSpy = jest.spyOn(formMethods, "setValue");
      return <FormProvider {...formMethods}>{children}</FormProvider>;
    };

    const { result } = renderHook(
      () => useCoreInputField({ inputName: "username" }),
      { wrapper: Wrapper }
    );

    act(() => {
      result.current.resetInput();
    });

    expect(clearErrorsSpy).toHaveBeenCalledWith("username");
    expect(setValueSpy).toHaveBeenCalledWith("username", "", {
      shouldDirty: true
    });
  });

  it("유효성 검사 옵션을 전달했을 때 validate 함수가 실행되는지 확인합니다.", async () => {
    const validateMock = jest.fn((val) => val === "abc" || "잘못된 값입니다");
    const { formMethods } = renderUseCoreInputField({
      inputName: "code",
      inputValidate: validateMock
    });

    await act(() => {
      formMethods.setValue("code", "xyz", { shouldValidate: true });
    });

    expect(validateMock).toHaveBeenCalledWith("xyz", { code: "xyz" });
  });

  it("필수 입력값 설정 시 에러 메시지가 출력되는지 확인합니다.", async () => {
    const requiredMsg = "이 필드는 필수입니다.";
    const { result, formMethods } = renderUseCoreInputField({
      inputName: "password",
      inputRequired: requiredMsg
    });

    await act(async () => {
      await formMethods.trigger("password");
    });

    expect(result.current.error?.message).toBe(requiredMsg);
  });

  it("패턴 검증 설정 시 에러 메시지가 출력되는지 확인합니다.", async () => {
    const { result, formMethods } = renderUseCoreInputField({
      inputName: "nickname",
      inputPattern: {
        value: /^[A-Za-z]+$/,
        message: "영문만 입력하세요."
      }
    });

    await act(async () => {
      formMethods.setValue("nickname", "123", { shouldValidate: true });
    });

    expect(result.current.error?.message).toBe("영문만 입력하세요.");
  });
});
