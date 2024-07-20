import { MyForm } from "@/components/commons/myForm/MyForm";
import { isMobile } from "react-device-detect";
import { FieldValues } from "react-hook-form";
import Loading from "@/app/loading";
import ProfileEditCloseBtn from "./profileEdit-close-btn";
import ProfileEditSubmitBtn from "./profileEdit-submit-btn";
import useProfileEditModalForm from "@/hooks/profileEdit/useProfileEditModalForm";
import ProfileEditImgField from "./profileEdit-img-field";
import ProfileEditNicknameField from "./profileEdit-nickname-field";
import ProfileEditIntroduceField from "./profileEdit-introduce-field";

interface IProps {
  handleClickProfieEditCloseBtn: () => void;
}

export default function ProfileEditModalForm({
  handleClickProfieEditCloseBtn,
}: IProps) {
  const {
    myProfileData,
    handleProfileEditSubmit,
    profileEditLoading,
    nicknameRef,
    introduceRef,
    closeBtnRef,
    submitBtnRef,
    profileImgBtnRef,
    profileImgResetBtnRef,
  } = useProfileEditModalForm({ closeModal: handleClickProfieEditCloseBtn });

  if (profileEditLoading) {
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
          profileImg: myProfileData ? myProfileData.profileImg : "",
        },
      }}
      className={`${
        isMobile ? "h-screen pt-20" : "max-w-[480px] justify-center"
      } fixed z-30 center flex flex-col gap-3 w-full p-8 border bg-white`}
    >
      <h2 className="text-xl text-center font-semibold mb-5">프로필 수정</h2>
      <ProfileEditImgField
        profileImgBtnRef={profileImgBtnRef}
        profileImgResetBtnRef={profileImgResetBtnRef}
        nicknameRef={nicknameRef}
        closeBtnRef={closeBtnRef}
      />
      <ProfileEditNicknameField
        nicknameRef={nicknameRef}
        profileImgBtnRef={profileImgBtnRef}
      />
      <ProfileEditIntroduceField introduceRef={introduceRef} />
      <ProfileEditSubmitBtn
        ref={submitBtnRef}
        closeBtnRef={closeBtnRef}
        introduceRef={introduceRef}
      />
      <ProfileEditCloseBtn
        ref={closeBtnRef}
        introduceRef={introduceRef}
        profileImgResetBtnRef={profileImgResetBtnRef}
        submitBtnRef={submitBtnRef}
        handleClickProfieEditCloseBtn={handleClickProfieEditCloseBtn}
      />
    </MyForm>
  );
}
