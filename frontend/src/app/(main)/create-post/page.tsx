"use client";
import SettingPost, { DataSettingPost } from "@/components/SettingPost";
import TextEditor from "@/components/TextEditor";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

const CreatePost = () => {
  const [openSetting, setOpenSetting] = useState(false);
  const [dataSettingPost, setDataSettingPost] = useState<DataSettingPost>({
    excerpt: "",
    image: null,
  });
  const handleGetDataSettingPost = (data: DataSettingPost) => {
    setDataSettingPost(data);
  };

  return (
    <div className="max-w-200 mt-20 mx-auto min-h-[70vh] space-y-5">
      <div>
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <FaUserCircle className="text-3xl" /> Author 1
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
      <TextEditor
        dataSettingPost={dataSettingPost}
        setDataSettingPost={handleGetDataSettingPost}
      />
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

export default CreatePost;
