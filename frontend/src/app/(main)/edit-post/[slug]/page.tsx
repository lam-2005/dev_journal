"use client";
import SettingPost, { DataSettingPost } from "@/components/SettingPost";
import TextEditor from "@/components/EditForm";
import useAuthStore from "@/store/useAuthStore";
import useBlogStore from "@/store/useBlogStore";
import { use, useEffect, useEffectEvent, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { PostType } from "@/interfaces/post.interface";

const EditPostPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  const { getPostById, isGettingPostById, postById } = useBlogStore();
  const [openSetting, setOpenSetting] = useState(false);
  const { authUser } = useAuthStore();
  const [dataSettingPost, setDataSettingPost] = useState<DataSettingPost>({
    excerpt: "",
    image: null,
  });
  const handleGetDataSettingPost = (data: DataSettingPost) => {
    setDataSettingPost(data);
  };
  const updateDataSettingPost = useEffectEvent((post: PostType) => {
    setDataSettingPost({
      excerpt: post.excerpt || "",
      image: post.image || null,
    });
  });
  useEffect(() => {
    if (postById) {
      updateDataSettingPost(postById);
    }
  }, [postById]);

  useEffect(() => {
    getPostById(slug);
  }, [getPostById, slug]);

  return (
    <div className="max-w-200 mt-20 mx-auto min-h-[70vh] space-y-5">
      <div>
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <FaUserCircle className="text-3xl" /> {authUser?.name}
          </div>
          <div
            className="font-mono text-sm flex items-center gap-2 cursor-pointer"
            onClick={() => setOpenSetting(true)}
          >
            <IoSettingsOutline />
            Post Settings
          </div>
        </div>
      </div>
      {isGettingPostById ? (
        <p>Loading...</p>
      ) : (
        postById && (
          <TextEditor
            dataPost={postById}
            dataSettingPost={dataSettingPost}
            setDataSettingPost={handleGetDataSettingPost}
          />
        )
      )}
      {openSetting && (
        <SettingPost
          setOpenSetting={setOpenSetting}
          onDataChange={handleGetDataSettingPost}
          currentData={dataSettingPost}
        />
      )}
    </div>
  );
};

export default EditPostPage;
