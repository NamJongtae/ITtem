"use client";

import Loading from "@/components/loading";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import useAuthStore from "@/domains/auth/store/auth-store";
import useChatStore from "@/domains/chat/store/chat-store";
import useNotificationStore from "@/domains/notification/store/notification-store";
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
