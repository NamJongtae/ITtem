"use client";

import MyForm from "@/shared/common/components/MyForm";
import { isMobile } from "react-device-detect";
import { FieldValues } from "react-hook-form";
import CloseBtn from "./CloseBtn";
import SubmitBtn from "./SubmitBtn";
import useProfileEditFormLogic from "../hooks/useProfileEditFormLogic";
import ImgField from "./ImgField";
import NicknameField from "./NicknameField";
import IntroduceField from "./IntroduceField";
import Loading from "@/shared/common/components/Loading";

interface IProps {
  isModal?: boolean;
}

export default function Form({ isModal }: IProps) {
  const {
    myProfileData,
    onSubmit,
    nicknameRef,
    introduceRef,
    closeBtnRef,
    submitBtnRef,
    profileImgBtnRef,
    profileImgResetBtnRef,
    profileEditLoading,
    myProfilePending,
    closeModalHandler
  } = useProfileEditFormLogic({ isModal });

  if (myProfilePending || profileEditLoading) {
    return <Loading />;
  }

  return (
    <MyForm
      onSubmit={(values: FieldValues) => {
        onSubmit(values);
      }}
      formOptions={{
        mode: "onChange",
        defaultValues: {
          nickname: myProfileData ? myProfileData.nickname : "",
          introduce: myProfileData ? myProfileData.introduce : "",
          profileImg: myProfileData ? myProfileData.profileImg : ""
        }
      }}
      className={`${
        isMobile ? "h-screen pt-20" : "max-w-[480px] justify-center"
      } fixed z-30 center flex flex-col gap-3 w-full p-8 bg-white`}
    >
      <h2 className="text-xl text-center font-semibold mb-5">프로필 수정</h2>
      <ImgField
        isModal={isModal}
        profileImgBtnRef={profileImgBtnRef}
        profileImgResetBtnRef={profileImgResetBtnRef}
        nicknameRef={nicknameRef}
        closeBtnRef={closeBtnRef}
      />
      <NicknameField
        isModal={isModal}
        nicknameRef={nicknameRef}
        profileImgBtnRef={profileImgBtnRef}
      />
      <IntroduceField introduceRef={introduceRef} />
      <SubmitBtn
        isModal={isModal}
        ref={submitBtnRef}
        closeBtnRef={closeBtnRef}
        introduceRef={introduceRef}
      />
      {isModal && (
        <CloseBtn
          isModal={isModal}
          ref={closeBtnRef}
          introduceRef={introduceRef}
          profileImgResetBtnRef={profileImgResetBtnRef}
          submitBtnRef={submitBtnRef}
          handleClickClose={closeModalHandler}
        />
      )}
    </MyForm>
  );
}
