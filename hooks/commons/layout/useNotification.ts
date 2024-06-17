import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { modalSlice } from "../../../store/modalSlice";
import useDebouncing from "../useDebouncing";
import { toast } from "react-toastify";
import {
  equalTo,
  get,
  increment,
  onValue,
  orderByChild,
  query,
  ref,
  update,
} from "firebase/database";
import { database } from "@/lib/firebaseSetting";
import { NotificationMessageData } from "@/types/notification";
import { useQueryClient } from "@tanstack/react-query";

export default function useNotification() {
  const [unreadCount, setUnreadCount] = useState(0);
  const queryClient = useQueryClient();

  const isOpenNotification = useSelector(
    (state: RootState) => state.modal.isOpenNotification
  );
  const dispatch = useDispatch<AppDispatch>();
  const notificationRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);

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
    dispatch(modalSlice.actions.openNotification());
  };

  const closeNotification = useCallback(() => {
    if (!notificationRef.current) return;
    notificationRef.current.classList.add("animate-leaving");
    timerRef.current = setTimeout(() => {
      dispatch(modalSlice.actions.closeNotificaiton());
    }, 180);
    return;
  }, []);

  const toggleNotification = () => {
    if (isOpenNotification) {
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

    if (isOpenNotification) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [closeNotification, isOpenNotification]);

  useEffect(() => {
    if (!user) return;

    const messageRef = ref(database, `notification/${user.uid}/messages`);
    const counterRef = ref(database, `notification/${user.uid}/counter`);
    const q = query(messageRef, orderByChild("isNotification"), equalTo(false));

    const unsubscribeMessage = onValue(q, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        (Object.entries(data) as [string, NotificationMessageData][]).forEach(
          async ([key, message]) => {
            toast.info(message.content);
            const messageRef = ref(
              database,
              `notification/${user.uid}/messages/${key}`
            );

            update(messageRef, { isNotification: true });

            const counterSnapshot = await get(counterRef);
            if (counterSnapshot.exists()) {
              await update(counterRef, { unreadCount: increment(1) });
            } else {
              await update(counterRef, { unreadCount: 1 });
            }
          }
        );
        queryClient.invalidateQueries({ queryKey: ["notification"] });
      }
    });

    const unsubscribeCounter = onValue(counterRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUnreadCount(data.unreadCount);
      }
    });

    return () => {
      unsubscribeMessage();
      unsubscribeCounter();
    };
  }, [user]);

  return {
    isOpenNotification,
    toggleNotification,
    notificationRef,
    unreadCount,
  };
}