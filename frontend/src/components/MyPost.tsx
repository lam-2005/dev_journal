"use client";
import { PostType } from "@/interfaces/post.interface";
import { convertDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SlOptionsVertical } from "react-icons/sl";
import { useEffect, useRef, useState } from "react";
import Dialog from "./Dialog";
import { LuPencil } from "react-icons/lu";
import { IoTrashOutline } from "react-icons/io5";
import useBlogStore from "@/store/useBlogStore";
import { ThreeDot } from "react-loading-indicators";
import { toast } from "react-toastify";
import { useRouter } from "nextjs-toploader/app";

const MyPost = ({ post }: { post: PostType }) => {
  const router = useRouter();
  const { isDeletingPost, deletePost } = useBlogStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const optionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        optionRef.current &&
        !optionRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleOpenOption = () => {
    setIsOpen((prev) => !prev);
  };

  const confirmDelete = () => {
    setIsOpen(false);
    setIsOpenDialog(true);
  };

  const handleDelete = async () => {
    if (!post?.id) return;

    try {
      await deletePost(post.id);
      setIsOpenDialog(true);
    } catch (error) {
      console.error("Delete failded:", error);
      toast.error("You can't delete this post right now!");
    }
  };

  return (
    <>
      {isDeletingPost && (
        <div className="top-0 left-0 bg-black/20 z-250 fixed w-screen h-screen flex flex-col gap-4 items-center justify-center">
          <ThreeDot color="#fff" size="medium" text="" textColor="" />
          <p className="text-lg text-background">
            Deleting post, please wait a moment...
          </p>
        </div>
      )}
      {isOpenDialog && (
        <Dialog
          title="Are you sure?"
          content="Do you want to delete the post?"
          setIsOpenDialog={setIsOpenDialog}
        >
          <button
            onClick={() => setIsOpenDialog(false)}
            className="cursor-pointer border border-foreground hover:bg-foreground/20 px-3 py-1.5"
          >
            Cancel
          </button>{" "}
          <button
            className="cursor-pointer bg-red-600 text-background px-3 py-1.5 hover:brightness-50"
            onClick={handleDelete}
          >
            Delete
          </button>
        </Dialog>
      )}
      <div className=" w-full border border-foreground/10">
        {post.image && (
          <div className="block w-full h-102.75">
            <Image
              src={post.image}
              alt={post.slug || post.title}
              width={940}
              height={411}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <div className="block min-h-43.75 p-8">
          <div className="font-mono text-xs flex items-center justify-between">
            <p>{convertDate(post.create_at ?? "")}</p>

            <div className="relative z-150" ref={optionRef}>
              <button onClick={handleOpenOption} className="cursor-pointer">
                <SlOptionsVertical className="text-sm" />
              </button>
              {isOpen && (
                <div className="p-2 w-75 absolute bg-background shadow-xl right-3 top-5 z-150">
                  <ul className="text-sm font-mono [&_li]:cursor-pointer [&_li]:flex [&_li]:items-center [&_li]:gap-2 [&_li]:px-5 [&_li]:py-2.5 [&_li]:hover:bg-foreground/20">
                    <li onClick={() => router.push(`/edit-post/${post.id}`)}>
                      <LuPencil /> Edit post
                    </li>
                    <div className="h-px w-full bg-foreground/20 my-2" />
                    <li className="text-red-500" onClick={confirmDelete}>
                      <IoTrashOutline /> Delete
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="block hover:text-primary h-full py-7"
          >
            <h2 className="font-medium text-3xl line-clamp-2">{post.title}</h2>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MyPost;
