import React from "react";
import { FaCamera } from "react-icons/fa";

const ProfilePage = () => {
  return (
    <div className="max-w-245 w-245 mx-auto">
      <div className="w-full h-62.5 bg-foreground p-8 flex flex-col justify-between">
        <button className="hover:text-background text-xl text-background/80 ">
          <FaCamera />
        </button>
        <div className="flex items-center gap-5 px-5">
          <div className="size-25 bg-amber-500 rounded-full"></div>
          <div className="text-3xl font-bold text-background">
            Phan Phúc Lâm
          </div>
        </div>
      </div>
      <div>
        <h1>Profile</h1>
        <p>Date joined: March 20, 2026</p>
        <hr />
        <h3>Ỉntroduction</h3>
        <textarea
          name=""
          id=""
          placeholder="Add a short biography or personal note."
        ></textarea>
      </div>
      <div>
        <h3>Posts</h3>
      cd backend
      </div>
    </div>
  );
};

export default ProfilePage;
