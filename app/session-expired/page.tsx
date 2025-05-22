"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useAuthStore from "@/domains/auth/store/auth-store";
import useChatStore from "@/domains/chat/store/chat-store";
import useNotificationStore from "@/domains/notification/store/notification-store";
import Loading from "@/components/loading";

export default function SessionExpired() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const authActions = useAuthStore((state) => state.actions);
  const chatActions = useChatStore((state) => state.actions);
  const notificationActions = useNotificationStore((state) => state.actions);

  useEffect(() => {
    if (!toast.isActive("session-expired-toast")) {
      toast.warn("로그인이 만료됐어요.", {
        toastId: "session-expired-toast",
        autoClose: 3000
      });
    }

    // 쿼리 데이터 초기화 및 전역 상태 초기화
    queryClient.clear();
    authActions.resetAuth();
    chatActions.resetChatState();
    notificationActions.resetUnreadCount();

    router.replace("/");
  }, [authActions, chatActions, notificationActions, queryClient, router]);

  return <Loading />;
}
