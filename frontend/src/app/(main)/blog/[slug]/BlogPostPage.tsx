"use client";
import CommentContainer from "@/components/CommentContainer";
import LoadingSkeletonPost from "@/components/LoadingSkeletonPost";
import NoPost from "@/components/NoPost";
import PostRecomented from "@/components/PostRecomented";
import { convertDate, estimateReadingTime } from "@/lib/utils";
import useAuthStore from "@/store/useAuthStore";
import useBlogStore from "@/store/useBlogStore";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaUserCircle } from "react-icons/fa";

const BlogPostPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  const {
    postBySlug,
    isGettingPostBySlug,
    getPostBySlug,
    getAllPostsRecent,
    postsRecent,
    isGettingAllPostsRecent,
    comments,
    likePost,
    incrementPostView,
  } = useBlogStore();
  const { userById, getUserById } = useAuthStore();

  useEffect(() => {
    incrementPostView(slug);
  }, [slug, incrementPostView]);
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

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (postBySlug?.id) likePost(postBySlug.id);
  };

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
            <Link
              href={`/profile/${postBySlug?.user_id}`}
              className="flex items-center gap-2 font-bold"
            >
              {" "}
              {userById?.avatar ? (
                <Image
                  src={userById.avatar}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <FaUserCircle className="text-3xl" />
              )}{" "}
              {userById?.name}{" "}
            </Link>
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
            <p>{postBySlug?.view || 0} views</p>
            <p>{comments?.length || 0} comments</p>
          </div>
          <button
            onClick={handleLike}
            className="flex items-center gap-1 cursor-pointer group"
          >
            <span className="text-xs text-foreground">
              {postBySlug?.like_count || ""}
            </span>
            <div className="text-2xl transition-transform group-hover:scale-110 active:scale-90">
              {postBySlug?.is_liked ? (
                <FaHeart className="text-red-500" />
              ) : (
                <CiHeart className="text-foreground" />
              )}
            </div>
          </button>
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
              {postsRecent
                .filter((post) => post.slug !== slug)
                .map((post) => (
                  <PostRecomented key={post.id} post={post} />
                ))}
            </div>
          </>
        ) : (
          <NoPost />
        )}
      </div>

      <CommentContainer postId={postBySlug?.id ?? ""} />
    </div>
  );
};

export default BlogPostPage;
