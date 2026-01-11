import { customFetch } from "@/shared/common/utils/customFetch";

export default async function unfollowUser(uid: string) {
  return await customFetch(`/api/user/${uid}/follow`, {
    method: "DELETE"
  });
}
