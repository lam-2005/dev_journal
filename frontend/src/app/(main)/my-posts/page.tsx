"use client";
import LoadingSkeletonPost from "@/components/LoadingSkeletonPost";
import MyPost from "@/components/MyPost";
import NoPost from "@/components/NoPost";
import useAuthStore from "@/store/useAuthStore";
import useBlogStore from "@/store/useBlogStore";
import Link from "next/link";
import { useEffect } from "react";

const MyPostsPage = () => {
  const { isGettingAllPostsByUserId, getAllPostsByUserId, postsByUserId } =
    useBlogStore();
  const { authUser, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    if (authUser?.id) getAllPostsByUserId(authUser?.id);
  }, [getAllPostsByUserId, authUser?.id]);
  if (isCheckingAuth) return <p>Please wait...</p>;
  return (
    <div className="max-w-200 mt-10 mx-auto min-h-[69vh]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">My Posts</h1>
        <Link href={"/create-post"} className="font-mono">
          Create Post
        </Link>
      </div>
      <div className="h-px w-full my-10 bg-foreground/20" />
      {isGettingAllPostsByUserId ? (
        <LoadingSkeletonPost type="large" />
      ) : postsByUserId && postsByUserId.length > 0 ? (
        <div className="flex flex-col gap-10">
          {postsByUserId.map((post) => (
            <MyPost key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <NoPost />
      )}
    </div>
  );
};

export default MyPostsPage;
