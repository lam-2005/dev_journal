"use client";

import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "nextjs-toploader/app";

const MenuDropDown = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const router = useRouter();
  const { logout } = useAuthStore();
  return (
    <ul className="absolute z-1000 right-0 top-full flex flex-col py-4 [&_li]:hover:bg-foreground/20 bg-secondary-background [&_li]:px-5 [&_li]:text-nowrap [&_li]:py-2 [&_li]:cursor-pointer translate-y-4 w-50">
      <li
        onClick={() => {
          router.push("/profile");
          setIsOpen(false);
        }}
      >
        Profile
      </li>
      <li
        onClick={() => {
          router.push("/my-posts");
          setIsOpen(false);
        }}
      >
        My Posts
      </li>
      <div className="px-5 my-2 h-px w-full bg-foreground/20" />
      <li className="" onClick={logout}>
        Log Out
      </li>
    </ul>
  );
};

export default MenuDropDown;
