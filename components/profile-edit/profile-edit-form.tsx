"use client";

import { MyForm } from "@/components/commons/my-form/my-form";
import { isMobile } from "react-device-detect";
import { FieldValues } from "react-hook-form";
import ProfileEditModalCloseBtn from "./profile-edit-modal-close-btn";
import ProfileEditSubmitBtn from "./profile-edit-submit-btn";
import useProfileEditForm from "@/hooks/profile-edit/useProfileEditForm";
import ProfileEditImgField from "./profile-edit-img-field";
import ProfileEditNicknameField from "./profile-edit-nickname-field";
import ProfileEditIntroduceField from "./profile-edit-introduce-field";
import Loading from '../commons/loading';


interface IProps {
  isModal?: boolean;
}

export default function ProfileEditForm({ isModal }: IProps) {
  const {
    myProfileData,
    loadMyProfileLoading,
    handleProfileEditSubmit,
    profileEditLoading,
    nicknameRef,
    introduceRef,
    closeBtnRef,
    submitBtnRef,
    profileImgBtnRef,
    profileImgResetBtnRef,
    handleClickClose
  } = useProfileEditForm({ isModal });

  if (profileEditLoading || loadMyProfileLoading) {
    return <Loading />;
  }

  return (
    <MyForm
      onSubmit={(values: FieldValues) => {
        handleProfileEditSubmit(values);
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
      <ProfileEditImgField
        isModal={isModal}
        profileImgBtnRef={profileImgBtnRef}
        profileImgResetBtnRef={profileImgResetBtnRef}
        nicknameRef={nicknameRef}
        closeBtnRef={closeBtnRef}
      />
      <ProfileEditNicknameField
        isModal={isModal}
        nicknameRef={nicknameRef}
        profileImgBtnRef={profileImgBtnRef}
      />
      <ProfileEditIntroduceField introduceRef={introduceRef} />
      <ProfileEditSubmitBtn
        isModal={isModal}
        ref={submitBtnRef}
        closeBtnRef={closeBtnRef}
        introduceRef={introduceRef}
      />
      {isModal && (
        <ProfileEditModalCloseBtn
          isModal={isModal}
          ref={closeBtnRef}
          introduceRef={introduceRef}
          profileImgResetBtnRef={profileImgResetBtnRef}
          submitBtnRef={submitBtnRef}
          handleClickClose={handleClickClose}
        />
      )}
    </MyForm>
  );
}
