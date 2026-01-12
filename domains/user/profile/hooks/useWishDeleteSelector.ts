import { WishlistProductData } from "../types/profileTypes";
import { useState } from "react";

export default function useWishDeleteSelector({
  data
}: {
  data: WishlistProductData[] | undefined;
}) {
  const [selectedWish, setSelectedWish] = useState<string[]>([]);

  const onClickSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allWishIds = data?.map((item) => item._id) || [];
      setSelectedWish(allWishIds);
    } else {
      setSelectedWish([]);
    }
  };

  const onClickCheckBox = (id: string) => {
    setSelectedWish((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((wishId) => wishId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  return { selectedWish, onClickCheckBox, onClickSelectAll };
}
