import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import authQueryKey from "@/domains/auth/query-keys/auth-query-keys";
import productQueryKey from "@/domains/product/query-keys/product-query-keys";
import profileQueryKey from "@/domains/user/query-keys/profile-query-keys";
import notificationQueryKey from "@/domains/notification/query-keys/notification-query-keys";
import sessionQueryKey from "@/domains/auth/query-keys/session-query-keys";

export const queryKeys = mergeQueryKeys(
  authQueryKey,
  productQueryKey,
  profileQueryKey,
  notificationQueryKey,
  sessionQueryKey
);
