import { MyForm } from "@/components/commons/myForm/MyForm";
import { isMobile } from "react-device-detect";
import ProfileEditBtns from "./profileEdit-btns";
import { FieldValues } from "react-hook-form";
import ProfileImgField from "@/components/signup/stepProfile/profileImg-field";
import NicknameField from "@/components/signup/stepProfile/nickname-field";
import IntroductField from "@/components/signup/setpIntroduce/introduce-field";
import useMyProfileQuery from "@/hooks/reactQuery/querys/profile/useMyProfileQuery";
import useProfileEditSubmit from "@/hooks/profileEdit/useProfileEditSubmit";
import Loading from "@/components/commons/loading";

interface IProps {
  closeModal: () => void;
}

export default function ProfileEditModalForm({ closeModal }: IProps) {
  const { myProfileData } = useMyProfileQuery();
  const { handleProfileEditSubmit, profileEditLoading } =
    useProfileEditSubmit(closeModal);

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
      <ProfileImgField />
      <NicknameField />
      <IntroductField />
      <ProfileEditBtns closeModal={closeModal} />
    </MyForm>
  );
}
