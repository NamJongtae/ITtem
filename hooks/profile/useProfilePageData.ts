import useProfileQuery from "../react-query/queries/profile/useProfileQuery";
import useMyProfileQuery from "../react-query/queries/profile/useMyProfileQuery";

export default function useProfilePageData() {
  const { profileData, loadProfileDataLoading, loadProfileDataError } =
    useProfileQuery();
  const { myProfileData, loadMyProfileLoading, loadMyProfileError } =
    useMyProfileQuery();

  const isLoading = loadProfileDataLoading || loadMyProfileLoading;
  const isError = loadProfileDataError || loadMyProfileError;

  return { profileData, myProfileData, isLoading, isError };
}
