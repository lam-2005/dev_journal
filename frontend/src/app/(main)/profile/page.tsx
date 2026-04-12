"use client";
import Dialog from "@/components/Dialog";
import LoadingSkeletonPost from "@/components/LoadingSkeletonPost";
import PostRecomented from "@/components/PostRecomented";
import { UserType } from "@/interfaces/auth.interface";
import { convertDate } from "@/lib/utils";
import useAuthStore from "@/store/useAuthStore";
import useBlogStore from "@/store/useBlogStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaCamera, FaTrashAlt, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { postsByUserId, isGettingAllPostsByUserId, getAllPostsByUserId } =
    useBlogStore();
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [activeButton, setActiveButton] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [edit, setEdit] = useState(false);
  const [introduction, setIntroduction] = useState(
    authUser?.introduction ?? "",
  );

  const [nameAndAvatar, setNameAndAvatar] = useState<Partial<UserType>>({
    name: authUser?.name,
    avatar: authUser?.avatar || "",
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputAvatarRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const maxIntroductionLength = 255;

  useEffect(() => {
    if (edit && textareaRef.current) {
      textareaRef.current.focus();
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [edit]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      await updateProfile({ background: base64Image as string });
    };
    reader.readAsDataURL(file);
  };

  const handleImageAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setNameAndAvatar({ ...nameAndAvatar, avatar: base64Image as string });
    };
    reader.readAsDataURL(file);
  };

  const handleResetImage = async () => {
    await updateProfile({ background: "" });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleResetAvatar = () => {
    setNameAndAvatar({ ...nameAndAvatar, avatar: "" });

    if (fileInputAvatarRef.current) {
      fileInputAvatarRef.current.value = "";
    }
  };
  useEffect(() => {
    if (authUser?.id) getAllPostsByUserId(authUser?.id);
  }, [getAllPostsByUserId, authUser?.id]);

  const handleUpdate = async () => {
    await updateProfile({ introduction });
    setEdit(false);
    setActiveButton(false);
  };

  const hanldeUpdateUsernameAndAvatar = async () => {
    try {
      await updateProfile({
        name: nameAndAvatar.name,
        avatar: nameAndAvatar.avatar,
      });
      setIsOpenDialog(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isOpenDialog && (
        <Dialog
          setIsOpenDialog={setIsOpenDialog}
          title="Edit profile"
          content={
            <div className="space-y-5 h-50 overflow-y-scroll">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-bold">
                  Username:
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  value={nameAndAvatar.name}
                  onChange={(e) =>
                    setNameAndAvatar({ ...nameAndAvatar, name: e.target.value })
                  }
                  className="border border-foreground/20 px-2.5 py-2 transition-all w-full outline-none text-base placeholder:text-foreground placeholder:font-mono focus:border-foreground placeholder:text-sm font-mono "
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="font-bold">Avatar:</div>
                <div className="flex items-center gap-3">
                  <div className="size-25 bg-background rounded-full overflow-hidden flex items-center justify-center">
                    {nameAndAvatar.avatar ? (
                      <Image
                        src={nameAndAvatar.avatar || ""}
                        alt="avatar"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUserCircle className="size-25" />
                    )}
                  </div>
                  <div className="">
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      id="file-upload-avatar"
                      onChange={handleImageAvatarChange}
                      ref={fileInputAvatarRef}
                    />
                    <label
                      htmlFor="file-upload-avatar"
                      className="bg-background text-foreground flex gap-2 items-center cursor-pointer border border-foreground hover:brightness-50 px-2.5 py-2 "
                      title="Change avatar"
                    >
                      Change avatar <FaCamera />
                    </label>
                    {nameAndAvatar.avatar && (
                      <button
                        onClick={handleResetAvatar}
                        className="text-red-500 bg-background border border-red-500 hover:brightness-50 px-2.5 py-2 mt-2 cursor-pointer"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <button
            className="bg-background text-foreground flex gap-2 items-center cursor-pointer border border-foreground hover:brightness-50 px-2.5 py-1"
            onClick={() => setIsOpenDialog(false)}
          >
            Cancel
          </button>
          <button
            className="text-background bg-foreground px-2.5 py-1 cursor-pointer"
            onClick={hanldeUpdateUsernameAndAvatar}
          >
            Save
          </button>
        </Dialog>
      )}
      <div className="max-w-245 w-245 mx-auto">
        <div className="w-full h-62.5 bg-foreground z-49 p-8 relative">
          <div className="absolute w-full h-full top-0 left-0 ">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              id="file-upload"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <label
              htmlFor="file-upload"
              className="absolute z-50 hover:text-background text-xl text-background/80 top-8 left-8 cursor-pointer"
              title="Change background"
            >
              <FaCamera />
            </label>
            {authUser?.background && (
              <button
                className="right-8 absolute text-red-500/80 hover:text-red-500 top-8 z-50 text-2xl"
                title="Remove background"
                onClick={handleResetImage}
              >
                <FaTrashAlt />
              </button>
            )}
            <div className="w-full h-full">
              {authUser?.background && (
                <Image
                  src={authUser?.background || ""}
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
              {authUser?.avatar ? (
                <Image
                  src={authUser?.avatar || ""}
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
                {authUser?.name}
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
            <button
              className="underline cursor-pointer hover:text-primary"
              onClick={() => setIsOpenDialog(true)}
            >
              Edit Profile
            </button>
          </div>
          <p className="font-mono text-sm mt-3">
            Date joined:{" "}
            {authUser?.create_at && convertDate(authUser?.create_at ?? "  ")}
          </p>
          <hr className="text-foreground/20 my-6" />
          <div className="">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium">Introduction</h3>
              {authUser?.introduction && !edit && (
                <button
                  className="underline cursor-pointer hover:text-primary"
                  onClick={() => {
                    setEdit(true);
                    setActiveButton(true);
                  }}
                >
                  Edit
                </button>
              )}
              {(edit || activeButton) && (
                <span className="text-xs">
                  {introduction.length}/{maxIntroductionLength}
                </span>
              )}
            </div>
            {edit && authUser?.introduction ? (
              <textarea
                ref={textareaRef}
                maxLength={255}
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                onFocus={() => setActiveButton(true)}
                placeholder="Add a short biography or personal note..."
                className="border border-foreground/20 resize-none px-2.5 py-2 h-25 transition-all w-full outline-none text-base placeholder:text-foreground placeholder:font-mono focus:border-foreground mt-6 placeholder:text-sm font-mono"
              ></textarea>
            ) : authUser?.introduction && !edit ? (
              <p className="mt-3 font-mono">{authUser.introduction}</p>
            ) : (
              <textarea
                value={introduction}
                maxLength={255}
                onChange={(e) => setIntroduction(e.target.value)}
                onFocus={() => setActiveButton(true)}
                placeholder="Add a short biography or personal note..."
                className="border border-foreground/20 resize-none px-2.5 py-2 h-25 transition-all w-full outline-none text-base placeholder:text-foreground placeholder:font-mono focus:border-foreground mt-6 placeholder:text-sm font-mono"
              ></textarea>
            )}
            {activeButton && (
              <div className="flex gap-5 mt-5 justify-end">
                <button
                  className="font-mono px-4 py-2 text-sm cursor-pointer hover:underline"
                  onClick={() => {
                    if (edit) setEdit(false);
                    setActiveButton(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={isUpdatingProfile}
                  className="bg-foreground text-background px-6 py-2 text-sm font-bold hover:underline hover:brightness-200 font-mono border border-foreground cursor-pointer disabled:cursor-not-allowed disabled:brightness-75 "
                >
                  {isUpdatingProfile ? "Saving..." : "Save"}
                </button>
              </div>
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
                <p>
                  You have no posts yet.{" "}
                  <Link
                    href={"/create-post"}
                    className="hover:text-primary underline font-bold"
                  >
                    Create one
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
