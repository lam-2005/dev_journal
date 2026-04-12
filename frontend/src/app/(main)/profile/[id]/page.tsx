"use client";
import { use } from "react";
import LoadingSkeletonPost from "@/components/LoadingSkeletonPost";
import PostRecomented from "@/components/PostRecomented";
import { convertDate } from "@/lib/utils";
import useAuthStore from "@/store/useAuthStore";
import useBlogStore from "@/store/useBlogStore";
import Image from "next/image";
import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

const ProfilePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { postsByUserId, isGettingAllPostsByUserId, getAllPostsByUserId } =
    useBlogStore();
  const { userById, isGettingUserById, getUserById } = useAuthStore();

  useEffect(() => {
    if (id) getAllPostsByUserId(id);
  }, [getAllPostsByUserId, id]);

  useEffect(() => {
    if (id) getUserById(id);
  }, [getUserById, id]);

  if (isGettingUserById) return <p>Please wait...</p>;
  return (
    <>
      <div className="max-w-245 w-245 mx-auto">
        <div className="w-full h-62.5 bg-foreground z-49 p-8 relative">
          <div className="absolute w-full h-full top-0 left-0 ">
            <div className="w-full h-full">
              {userById?.background && (
                <Image
                  src={userById?.background || ""}
                  alt="background"
                  width={980}
                  height={250}
                  className="object-cover w-full h-full brightness-50"
                />
              )}
            </div>
          </div>
          <div className="flex items-center gap-5 px-5 absolute z-51 top-full -translate-y-[calc(100%+32px)]">
            <div className="size-25 bg-background rounded-full overflow-hidden flex items-center justify-center">
              {userById?.avatar ? (
                <Image
                  src={userById?.avatar || ""}
                  alt="avatar"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserCircle className="size-25" />
              )}
            </div>
            <div className="flex flex-col mt-5">
              <div className="text-3xl font-bold text-background">
                {userById?.name}
              </div>
              <p className="text-background font-mono text-sm">
                {postsByUserId?.length || 0} posts
              </p>
            </div>
          </div>
        </div>
        <div className="px-8">
          <div className="flex items-center justify-between mt-6">
            <h1 className="text-2xl font-bold">Profile</h1>
          </div>
          <p className="font-mono text-sm mt-3">
            Date joined:{" "}
            {userById?.create_at && convertDate(userById?.create_at ?? "  ")}
          </p>
          <hr className="text-foreground/20 my-6" />
          <div className="">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium">Introduction</h3>
            </div>
            {userById?.introduction ? (
              <p className="mt-3 font-mono">{userById.introduction}</p>
            ) : (
              <p className=" text-center my-6 font-mono">No introduction.</p>
            )}
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-medium ">Posts</h3>
            {isGettingAllPostsByUserId ? (
              <LoadingSkeletonPost />
            ) : postsByUserId && postsByUserId.length > 0 ? (
              <div className="grid grid-cols-3 mt-6 gap-5">
                {postsByUserId.map((post) => (
                  <PostRecomented key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="w-full h-50 flex items-center justify-center font-mono">
                <div className="flex gap-2">
                  <p>There are no posts yet.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
