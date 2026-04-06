"use client";
import LoadingSkeletonPost from "@/components/LoadingSkeletonPost";
import NoPost from "@/components/NoPost";
import PostRecomented from "@/components/PostRecomented";
import { convertDate, estimateReadingTime } from "@/lib/utils";
import useAuthStore from "@/store/useAuthStore";
import useBlogStore from "@/store/useBlogStore";
import Link from "next/link";
import { use, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";

const BlogPostPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  const {
    postBySlug,
    isGettingPostBySlug,
    getPostBySlug,
    getAllPostsRecent,
    postsRecent,
    isGettingAllPostsRecent,
  } = useBlogStore();
  const { userById, getUserById } = useAuthStore();

  useEffect(() => {
    getAllPostsRecent();
  }, [getAllPostsRecent]);

  useEffect(() => {
    getPostBySlug(slug);
  }, [getPostBySlug, slug]);

  useEffect(() => {
    if (postBySlug?.user_id) {
      getUserById(postBySlug.user_id);
    }
  }, [getUserById, postBySlug?.user_id]);

  if (isGettingPostBySlug)
    return (
      <div className="min-h-[69vh]">
        <div className="w-200 h-100 bg-foreground/10 animate-pulse mt-20 mx-auto"></div>
      </div>
    );
  if (!postBySlug && !isGettingPostBySlug) return <p>Post not found!</p>;

  return (
    <div className="mt-20 max-w-250 mx-auto">
      <div className="container">
        <div>
          <div className="flex items-center gap-2 text-sm">
            <FaUserCircle className="text-3xl" /> {userById?.name}{" "}
            <span>•</span>{" "}
            <span className="font-mono">
              {convertDate(postBySlug?.create_at ?? "")}
            </span>{" "}
            <span>•</span>{" "}
            <span className="font-mono">
              {estimateReadingTime(postBySlug?.content ?? "")} min read
            </span>
          </div>
        </div>
        <div className="mt-5">
          <h2 className="text-xl font-bold">{postBySlug?.title}</h2>
          <div
            className="mt-5 font-mono"
            dangerouslySetInnerHTML={{ __html: postBySlug?.content ?? "" }}
          ></div>
        </div>
        <div className="my-5 h-px w-full bg-foreground/20" />
        <div className="font-mono flex text-sm justify-between">
          <div className="flex gap-5 ">
            <p>{postBySlug?.view} views</p>
            <p>0 comments</p>
          </div>
          <div className="text-red-500 text-2xl ">
            <CiHeart />
          </div>
        </div>
      </div>
      <div className="font-mono mt-20">
        <div className="flex justify-between">
          <h3 className="text-xl">Recent Posts</h3>
          <Link href={"/blog"}>See all</Link>
        </div>
        {isGettingAllPostsRecent ? (
          <LoadingSkeletonPost />
        ) : postsRecent && postsRecent.length > 0 ? (
          <>
            <div className="grid grid-cols-3 gap-8 justify-center mt-10">
              {postsRecent.map((post) => (
                <PostRecomented key={post.id} post={post} />
              ))}
            </div>
          </>
        ) : (
          <NoPost />
        )}
      </div>
    </div>
  );
};

export default BlogPostPage;
