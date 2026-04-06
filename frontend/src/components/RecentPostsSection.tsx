"use client";
import useBlogStore from "@/store/useBlogStore";
import NoPost from "./NoPost";
import PostRecomented from "./PostRecomented";
import { useEffect } from "react";
import LoadingSkeletonPost from "./LoadingSkeletonPost";

const RecentPostsSection = () => {
  const { getAllPostsRecent, postsRecent, isGettingAllPostsRecent } =
    useBlogStore();
  useEffect(() => {
    getAllPostsRecent();
  }, [getAllPostsRecent]);
  return (
    <section className="flex flex-col items-center gap-20">
      <h1 className="text-5xl font-light text-center">
        Recent <span className="font-extrabold">Blog</span> Posts
      </h1>
      {isGettingAllPostsRecent ? (
        <LoadingSkeletonPost />
      ) : postsRecent && postsRecent.length > 0 ? (
        <>
          <div className="grid grid-cols-3 gap-8 justify-center ">
            {postsRecent.map((post) => (
              <PostRecomented key={post.id} post={post} />
            ))}
          </div>
          <button className="border border-foreground px-8 py-2 flex gap-2 items-center justify-center font-mono">
            See all
          </button>
        </>
      ) : (
        <NoPost />
      )}
    </section>
  );
};

export default RecentPostsSection;
