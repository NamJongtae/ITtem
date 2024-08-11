import { useCallback, useEffect, useRef, useState } from "react";
import useDebouncing from "../useDebouncing";
import { toast } from "react-toastify";
import { NotificationMessageData } from "@/types/notification-types";
import { useQueryClient } from "@tanstack/react-query";
import { isMobile } from "react-device-detect";
import { getRealtimeDB } from "@/lib/firebaseSetting";
import { queryKeys } from "@/query-keys/query-keys";
import useNotificationStore from "@/store/notification-store";
import useAuthStore from "@/store/auth-store";

export default function useNotification() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    if (isMobile) {
      history.back();
    }
    setIsOpenModal(false);
  };

  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const actions = useNotificationStore((state) => state.actions);
  const user = useAuthStore((state) => state.user);

  const queryClient = useQueryClient();

  const notificationRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncing = useDebouncing();

  const handleClickLink = debouncing(() => {
    if (!user) {
      toast.warn("로그인 후 이용해주세요.");
    }
  }, 500);

  const openNotification = () => {
    if (!user) {
      handleClickLink();
      return;
    }
    openModal();
  };

  const closeNotification = useCallback(() => {
    if (!notificationRef.current) return;
    notificationRef.current.classList.add("animate-leaving");
    timerRef.current = setTimeout(() => {
      closeModal();
    }, 180);
    return;
  }, []);

  const toggleNotification = () => {
    if (isOpenModal) {
      closeNotification();
      return;
    }
    openNotification();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      ) {
        closeNotification();
      }
    };

    if (isOpenModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [closeNotification, isOpenModal]);

  useEffect(() => {
    if (!user) return;

    let unsubscribeMessage: any;
    let unsubscribeCounter: any;

    const loadFirebase = async () => {
      const {
        equalTo,
        get,
        increment,
        onValue,
        orderByChild,
        query,
        ref,
        update
      } = await import("firebase/database");
      const database = await getRealtimeDB();
      const messageRef = ref(database, `notification/${user.uid}/messages`);
      const counterRef = ref(database, `notification/${user.uid}/counter`);
      const q = query(
        messageRef,
        orderByChild("isNotification"),
        equalTo(false)
      );

      unsubscribeMessage = onValue(q, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          (Object.entries(data) as [string, NotificationMessageData][]).forEach(
            async ([key, message]) => {
              toast.info(message.content);
              const messageRef = ref(
                database,
                `notification/${user.uid}/messages/${key}`
              );

              await update(messageRef, { isNotification: true });

              const counterSnapshot = await get(counterRef);
              if (counterSnapshot.exists()) {
                await update(counterRef, { unreadCount: increment(1) });
              } else {
                await update(counterRef, { unreadCount: 1 });
              }
            }
          );
          queryClient.invalidateQueries({
            queryKey: queryKeys.notification.messages().queryKey
          });
        }
      });

      unsubscribeCounter = onValue(counterRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          actions.setUnreadCount(data.unreadCount);
        }
      });
    };

    loadFirebase();

    return () => {
      if (unsubscribeMessage) {
        unsubscribeMessage();
      }
      if (unsubscribeCounter) {
        unsubscribeCounter();
      }
    };
  }, [user, actions]);

  return {
    isOpenModal,
    toggleNotification,
    notificationRef,
    unreadCount
  };
}
