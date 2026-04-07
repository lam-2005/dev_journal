"use client";

import useBlogStore from "@/store/useBlogStore";
import JoditEditor from "jodit-react";
import { useMemo, useRef, useState } from "react";
import { DataSettingPost } from "./SettingPost";
import { ThreeDot } from "react-loading-indicators";
import { PostType } from "@/interfaces/post.interface";
import { useRouter } from "nextjs-toploader/app";

const TextEditor = ({
  dataSettingPost,
  setDataSettingPost,
  dataPost,
}: {
  dataSettingPost: DataSettingPost;
  setDataSettingPost: (data: DataSettingPost) => void;
  dataPost: PostType;
}) => {
  const router = useRouter();
  const { updatePost, isUpdatingPost } = useBlogStore();
  const editorRef = useRef<any>(null);
  const [content, setContent] = useState(dataPost.content || "");
  const [title, setTitle] = useState(dataPost.title || "");
  const config = useMemo(() => {
    return {
      placeholder: "Write something great...",
      height: 350,
      removeButtons: ["source", "fullsize", "print", "about", "font"],
      uploader: {
        insertImageAsBase64URI: true,
      },
    };
  }, []);

  const onSubmit = async () => {
    const res: any = await updatePost({
      id: dataPost.id || "",
      data: { title, content, ...dataSettingPost },
    });
    setDataSettingPost({ excerpt: "", image: null });
    setTitle("");
    setContent("");
    router.push(`/blog/${res.data.slug || ""}`);
  };

  return (
    <>
      {" "}
      {isUpdatingPost && (
        <div className="top-0 left-0 bg-black/20 z-102 fixed w-screen h-screen flex flex-col gap-4 items-center justify-center">
          <ThreeDot color="#fff" size="medium" text="" textColor="" />
          <p className="text-lg text-background">
            Your post is being reviewed, please wait a moment...
          </p>
        </div>
      )}
      <div className="w-full bg-secondary-background">
        <input
          type="text"
          name=""
          id=""
          className="text-2xl font-bold placeholder:font-normal w-full px-2.5 py-2.5 outline-none"
          placeholder="Add a catchy title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="">
        <JoditEditor
          ref={editorRef}
          // onChange={(val) => setContent(val)}
          onBlur={(newContent) => setContent(newContent)}
          value={content}
          config={config}
          className="font-mono"
        />
      </div>
      <div className=" flex justify-end items-center gap-5">
        <button
          className="border border-foreground font-mono px-4 py-2 text-sm cursor-pointer"
          onClick={() => router.push("/my-posts")}
        >
          Cancel
        </button>
        <button
          className="bg-primary px-6 py-2 text-sm font-bold hover:brightness-75 font-mono border border-foreground cursor-pointer disabled:cursor-not-allowed disabled:brightness-75"
          onClick={onSubmit}
          disabled={isUpdatingPost}
        >
          {isUpdatingPost ? "Updating..." : "Update"}
        </button>
      </div>
    </>
  );
};

export default TextEditor;
