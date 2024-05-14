import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";
import Empty from "@/components/commons/Empty";
import InfiniteScroll from "react-infinite-scroller";
import { isAxiosError } from "axios";
import ProductListPlaceholder from "@/components/commons/productList/product-list-placeholder";
import useFollowListInfiniteQuery from "@/hooks/querys/useFollowListInfiniteQuery";
import Link from "next/link";
import { ProfileData } from "@/types/authTypes";
import ProfileDetailFollowItem from "./profile-detail-follow-item";
import FollowListSkeletonUI from "./follow-list-skeletonUI";
const ReactStars = dynamic(() => import("react-stars"), {
  ssr: false,
  loading: () => <p>loading...</p>,
});

interface IProps {
  isFollowers: boolean;
  profileData: ProfileData | undefined;
  myProfileData: ProfileData | undefined;
}

export default function ProfileDetailFollowList({
  isFollowers,
  profileData,
  myProfileData,
}: IProps) {
  const userIds = isFollowers
    ? profileData?.followers
    : profileData?.followings;
  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
    isLoading,
  } = useFollowListInfiniteQuery({
    isFollowers,
    userIds,
    uid: profileData?.uid,
  });

  return (
    <>
      {error && !data ? (
        <Empty
          message={
            isAxiosError<{ message: string }>(error)
              ? error.response?.data.message || ""
              : ""
          }
        />
      ) : null}
      <InfiniteScroll
        hasMore={hasNextPage && !error}
        loadMore={() => {
          if (!isFetchingNextPage) fetchNextPage();
        }}
      >
        <ul className="grid gap-8 grid-cols-autoFill_180">
          {isLoading ? (
            <FollowListSkeletonUI />
          ) : (
            data?.map((item) => (
              <ProfileDetailFollowItem
                key={item.uid}
                data={item}
                myProfileData={myProfileData}
              />
            ))
          )}
          {isFetchingNextPage && <FollowListSkeletonUI />}
        </ul>
      </InfiniteScroll>
    </>
  );
}
