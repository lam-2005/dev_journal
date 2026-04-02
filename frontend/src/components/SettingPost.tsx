"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { CiCamera } from "react-icons/ci";
import { HiArrowPath } from "react-icons/hi2";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
interface SettingPostProps {
  onDataChange: (val: DataSettingPost) => void;
  setOpenSetting: (open: boolean) => void;
  currentData?: DataSettingPost;
}
export type DataSettingPost = {
  excerpt: string;
  image: string | null;
};
const SettingPost = ({
  setOpenSetting,
  onDataChange,
  currentData,
}: SettingPostProps) => {
  const maxExcerptLength = 500;
  const [excerpt, setExcerpt] = useState(currentData?.excerpt || "");
  const [isFocus, setIsFocus] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    currentData?.image || null,
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
      setImagePreview(base64Image as string);
    };
    reader.readAsDataURL(file);
  };

  const handleResetImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = () => {
    try {
      onDataChange({ excerpt, image: imagePreview });
      toast.success("Post settings saved successfully!");
      setOpenSetting(false);
    } catch (error) {
      console.error("Error saving post settings:", error);
      toast.error("Failed to save post settings.");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen ">
      <div
        className="w-full h-full bg-foreground/50 absolute z-100"
        onClick={() => setOpenSetting(false)}
      />
      <div className="bg-background absolute right-0 h-full p-10 flex flex-col z-101">
        <h2 className="text-2xl font-bold">Post Settings</h2>
        <div className="mt-10 space-y-5 flex-1">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="excerpt"
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                Excerpt{" "}
                <div className="">
                  <a
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Write a few lines to attract readers. The excerpt will appear in the blog feed depending on your layout."
                    className="size-3.5 border border-foreground rounded-full text-xs flex items-center justify-center"
                  >
                    ?
                  </a>
                  <Tooltip
                    id="my-tooltip"
                    arrowSize={0}
                    place="top"
                    style={{
                      fontSize: "12px",
                      width: "250px",
                    }}
                  />
                </div>
              </div>
              {isFocus && (
                <span className="text-xs">
                  {maxExcerptLength - excerpt.length}/{maxExcerptLength}
                </span>
              )}
            </label>
            <textarea
              name=""
              id="excerpt"
              className=" border border-foreground/20 resize-none px-2.5 py-2 max-h-20.75 outline-none text-base placeholder:text-foreground"
              placeholder="Add excerpt..."
              onFocus={() => setIsFocus(true)}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              onBlur={() => {
                if (!excerpt) setIsFocus(false);
              }}
              maxLength={maxExcerptLength}
            ></textarea>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="excerpt"
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                Thumbnail
                <div className="">
                  <a
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="You can upload a custom cover image here. By default, we use the first image in your post."
                    className="size-3.5 border border-foreground rounded-full text-xs flex items-center justify-center"
                  >
                    ?
                  </a>
                  <Tooltip
                    id="my-tooltip"
                    arrowSize={0}
                    place="top"
                    style={{
                      fontSize: "12px",
                      width: "250px",
                    }}
                  />
                </div>
              </div>
              {imagePreview && (
                <span
                  className="text-sm cursor-pointer"
                  onClick={handleResetImage}
                >
                  Reset
                </span>
              )}
            </label>
            <div className="w-86.25 h-50 bg-stone-200 relative">
              {imagePreview && (
                <div className="w-full h-full">
                  <Image
                    src={imagePreview || ""}
                    alt="preview"
                    width={345}
                    height={200}
                    className="object-cover h-full w-full"
                  />
                </div>
              )}
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
                className="text-sm bg-background flex items-center justify-center gap-2 px-2.5 py-2 cursor-pointer absolute
                top-1/2 left-1/2 -translate-1/2"
              >
                {imagePreview ? (
                  <>
                    <HiArrowPath className="text-xl" /> Change Thumbnai
                  </>
                ) : (
                  <>
                    <CiCamera className="text-xl" /> Upload Thumbnai
                  </>
                )}
              </label>
            </div>
          </div>
        </div>
        <div className="gap-5 self-end flex">
          <button
            className="border border-foreground font-mono px-4 py-2 text-sm cursor-pointer"
            onClick={() => setOpenSetting(false)}
          >
            Cancel
          </button>
          <button
            className="bg-foreground text-background px-4 py-2 text-sm cursor-pointer"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingPost;
