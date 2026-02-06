import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { NotificationMessageData } from "@/domains/notification/types/notificationTypes";
import { useQueryClient } from "@tanstack/react-query";
import { isMobile } from "react-device-detect";
import { getRealtimeDB } from "@/shared/common/utils/firebaseSetting";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useNotificationStore from "@/domains/notification/store/notificationStore";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { useRouter } from "next/navigation";
import { Unsubscribe } from "firebase/firestore";

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

  const router = useRouter();

  const openNotification = () => {
    if (!user) {
      router.push("/signin");
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

    let unsubscribeMessage: Unsubscribe | undefined;
    let unsubscribeCounter: Unsubscribe | undefined;

    const loadFirebase = async () => {
      const {
        equalTo,
        get,
        increment,
        onChildAdded,
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

      // 새로 추가된(isNotification === false) 알림에 대해서만 한 번만 콜백이 실행되도록 onChildAdded 사용
      unsubscribeMessage = onChildAdded(
        q,
        async (snapshot) => {
          const key = snapshot.key;
          const message = snapshot.val() as NotificationMessageData | null;

          if (!key || !message) return;

          toast.info(message.content);

          const targetMessageRef = ref(
            database,
            `notification/${user.uid}/messages/${key}`
          );

          await update(targetMessageRef, { isNotification: true });

          const counterSnapshot = await get(counterRef);
          if (counterSnapshot.exists()) {
            await update(counterRef, { unreadCount: increment(1) });
          } else {
            await update(counterRef, { unreadCount: 1 });
          }

          queryClient.invalidateQueries({
            queryKey: queryKeys.notification.messages().queryKey
          });
        }
      );

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
