import { MyForm } from "@/components/commons/myForm/MyForm";
import { isMobile } from "react-device-detect";
import { FieldValues } from "react-hook-form";
import Loading from "@/components/commons/loading";
import ProfileEditCancelBtn from "./profileEdit-cancel-btn";
import ProfileEditSubmitBtn from "./profileEdit-submit-btn";
import useProfileEditModalForm from "@/hooks/profile/useProfileEditModalForm";
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
    cancelBtnRef,
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
        isMobile ? "h-screen center" : "max-w-[480px] center"
      } fixed z-30 flex flex-col justify-center gap-3 w-full p-8 border bg-white`}
    >
      <h2 className="text-xl text-center font-semibold mb-5">프로필 수정</h2>
      <ProfileEditImgField
        profileImgBtnRef={profileImgBtnRef}
        profileImgResetBtnRef={profileImgResetBtnRef}
        nicknameRef={nicknameRef}
        cancelBtnRef={cancelBtnRef}
        submitBtnRef={submitBtnRef}
      />
      <ProfileEditNicknameField
        nicknameRef={nicknameRef}
        profileImgBtnRef={profileImgBtnRef}
      />
      <ProfileEditIntroduceField introduceRef={introduceRef} />
      <div className="mt-8 flex gap-3 justify-end">
        <ProfileEditCancelBtn
          ref={cancelBtnRef}
          introduceRef={introduceRef}
          profileImgResetBtnRef={profileImgResetBtnRef}
          submitBtnRef={submitBtnRef}
          handleClickProfieEditCloseBtn={handleClickProfieEditCloseBtn}
        />
        <ProfileEditSubmitBtn
          ref={submitBtnRef}
          cancelBtnRef={cancelBtnRef}
          profileImgResetBtnRef={profileImgResetBtnRef}
        />
      </div>
    </MyForm>
  );
}
