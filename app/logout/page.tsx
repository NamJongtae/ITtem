"use client";

import Loading from "@/shared/common/components/Loading";
import { useCustomRouter } from "@/shared/common/hooks/useCustomRouter";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import useChatStore from "@/domains/chat/shared/store/chatStore";
import useNotificationStore from "@/domains/notification/store/notificationStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Logout() {
  const { actions: authActions, user } = useAuthStore((state) => state);
  const chatActions = useChatStore((state) => state.actions);
  const notificationActions = useNotificationStore((state) => state.actions);
  const queryClient = useQueryClient();
  const { navigate } = useCustomRouter();

  useEffect(() => {
    if (!user) return navigate({ type: "replace", url: "/" });

    queryClient.clear();
    authActions.resetAuth();
    chatActions.resetChatState();
    notificationActions.resetUnreadCount();
    navigate({ type: "replace", url: "/" });
  }, [
    authActions,
    chatActions,
    navigate,
    notificationActions,
    queryClient,
    user
  ]);

  return (
    <div className="fixed inset-0 bg-white z-[99]">
      <Loading />
    </div>
  );
}
