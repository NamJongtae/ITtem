import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import authQueryKey from "@/domains/auth/shared/common/query-keys/authQueryKeys";
import productQueryKey from "@/domains/product/shared/query-keys/productQueryKeys";
import profileQueryKey from "@/domains/user/profile/query-keys/profileQueryKeys";
import notificationQueryKey from "@/domains/notification/query-keys/notificationQueryKeys";
import sessionQueryKey from "@/domains/auth/shared/common/query-keys/sessionQueryKeys";

export const queryKeys = mergeQueryKeys(
  authQueryKey,
  productQueryKey,
  profileQueryKey,
  notificationQueryKey,
  sessionQueryKey
);
