import CoreInputField from "@/components/core-input-field/core-input-field";
import {
  NICKNAME_REGEX,
  NICKNAME_REGEX_ERRORMSG
} from "@/domains/auth/constants/constansts";
import { useFocusing } from "@/hooks/useFocusing";
import useProfileEditNicknameField from "../../hooks/profile-edit/useProfileEditNicknameField";
import { optimizationTabFocus } from "@/utils/optimizationKeyboard";
import { RefObject } from "react";

interface IProps {
  isModal?: boolean;
  nicknameRef: RefObject<HTMLInputElement | null>;
  profileImgBtnRef: RefObject<HTMLButtonElement | null>;
}

export default function ProfileEditNicknameField({
  isModal,
  nicknameRef,
  profileImgBtnRef
}: IProps) {
  useFocusing(nicknameRef);
  const { validateNicknameOnBlur } = useProfileEditNicknameField();

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
        inputOnBlur={validateNicknameOnBlur}
        inputPattern={{
          value: NICKNAME_REGEX,
          message: NICKNAME_REGEX_ERRORMSG
        }}
        inputRef={nicknameRef}
        inputKeydown={
          isModal
            ? (e) =>
                optimizationTabFocus({
                  event: e,
                  previousTarget: profileImgBtnRef.current
                })
            : undefined
        }
      />
    </div>
  );
}
