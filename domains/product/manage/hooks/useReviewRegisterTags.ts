import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function useReviewRegisterTags() {
  const { register, unregister } = useFormContext();
  useEffect(() => {
    register("tags");
    return () => unregister("tags");
  }, [register, unregister]);
}
