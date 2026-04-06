"use client";
import Heading from "@/components/Heading";
import LoadingSkeletonPost from "@/components/LoadingSkeletonPost";
import NoPost from "@/components/NoPost";
import Post from "@/components/Post";
import useBlogStore from "@/store/useBlogStore";
import { useEffect } from "react";

const BlogPage = () => {
  const { getAllPosts, isGettingAllPosts, posts } = useBlogStore();
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);
  return (
    <div className="mt-20">
      <Heading>
        <span className="font-extrabold text-7xl">Blog</span>
      </Heading>
      <div className="mt-20 flex flex-col items-center gap-15 min-h-[40vh]">
        {isGettingAllPosts ? (
          <LoadingSkeletonPost type="large" />
        ) : posts && posts.length > 0 ? (
          posts.map((item) => <Post key={item.id} data={item} />)
        ) : (
          <div className="min-h-[80%]">
            <NoPost />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
