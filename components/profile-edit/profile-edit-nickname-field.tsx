import CoreInputField from "@/components/commons/core-input-field/core-input-field";
import { NICKNAME_REGEX, NICKNAME_REGEX_ERRORMSG } from "@/constants/constant";
import { useFocusing } from "@/hooks/commons/useFocusing";
import useProfileEditNicknameField from "@/hooks/profile-edit/useProfileEditNicknameField";
import { optimizationTabFocus } from "@/lib/optimizationKeyboard";
import { MutableRefObject } from "react";

interface IProps {
  isModal?: boolean;
  nicknameRef: MutableRefObject<HTMLInputElement | null>;
  profileImgBtnRef: MutableRefObject<HTMLButtonElement | null>;
}

export default function ProfileEditNicknameField({
  isModal,
  nicknameRef,
  profileImgBtnRef,
}: IProps) {
  useFocusing(nicknameRef);
  const { handleBlur } = useProfileEditNicknameField();

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
        inputOnBlur={handleBlur}
        inputPattern={{
          value: NICKNAME_REGEX,
          message: NICKNAME_REGEX_ERRORMSG,
        }}
        inputRef={nicknameRef}
        inputKeydown={
          isModal
            ? (e) =>
                optimizationTabFocus({
                  event: e,
                  previousTarget: profileImgBtnRef.current,
                })
            : undefined
        }
      />
    </div>
  );
}
