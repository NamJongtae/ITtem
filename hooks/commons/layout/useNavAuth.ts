import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";

export default function useNavAuth() {
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user) {
      localStorage.setItem("uid", JSON.stringify(user));
    } else {
      if (localStorage.getItem("uid")) {
        localStorage.removeItem("uid");
      }
    }
  }, [user]);

  return { user };
}
