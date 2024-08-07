import { useCallback, useState } from "react";
import useProfileWishInfiniteQuery from "../react-query/queries/profile/useProfileWishInfiniteQuery";

interface IParams {
  wishProductIds: string[] | undefined;
}

export default function useProfileDetailWishList({ wishProductIds }: IParams) {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useProfileWishInfiniteQuery({
    wishProductIds: wishProductIds || [],
  });

  const [selectedWish, setSelectedWish] = useState<string[]>([]);
  const handleSelectAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        const allWishIds = data?.map((item) => item._id) || [];
        setSelectedWish(allWishIds);
      } else {
        setSelectedWish([]);
      }
    },
    [data]
  );

  const handleCheckWish = useCallback((id: string) => {
    setSelectedWish((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((wishId) => wishId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  }, []);

  return {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
    selectedWish,
    handleSelectAll,
    handleCheckWish,
  };
}
