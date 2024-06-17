import CoreInputField from "@/components/commons/coreInputField/core-input-field";
import { NICKNAME_REGEX, NICKNAME_REGEX_ERRORMSG } from "@/constants/constant";
import { useFocusing } from "@/hooks/commons/useFocusing";
import { optModalTabFocus } from "@/lib/optimizationTabFocus";
import { MutableRefObject } from "react";

interface IProps {
  nicknameRef: MutableRefObject<HTMLInputElement | null>;
  profileImgBtnRef: MutableRefObject<HTMLButtonElement | null>;
}

export default function NicknameField({ nicknameRef, profileImgBtnRef }: IProps) {
  useFocusing(nicknameRef);

  return (
    <div>
      <CoreInputField
        label="닉네임"
        inputId="nickname"
        inputName="nickname"
        inputType="text"
        inputMinLength={4}
        inputMaxLength={8}
        inputPlaceholder="닉네임을 입력해주세요."
        inputRequired="닉네임을 입력해주세요."
        inputPattern={{
          value: NICKNAME_REGEX,
          message: NICKNAME_REGEX_ERRORMSG,
        }}
        inputRef={nicknameRef}
        inputKeydown={(e) =>
          optModalTabFocus({ event: e, previousTarget: profileImgBtnRef.current })
        }
      />
    </div>
  );
}
