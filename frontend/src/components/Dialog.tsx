"use client";
import React from "react";

const Dialog = ({
  title,
  content,
  children,
  setIsOpenDialog,
}: {
  title: string;
  content?: string | React.ReactNode;
  children: React.ReactNode;
  setIsOpenDialog: (value: boolean) => void;
}) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-100">
      <div
        className="bg-foreground/50 absolute w-full h-full z-200"
        onClick={() => setIsOpenDialog(false)}
      />
      <div className="p-8 bg-background flex flex-col absolute top-1/2 left-1/2 -translate-1/2  z-201 min-w-150">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="font-mono text-sm mt-4">{content}</p>
        <div className="mt-7 self-end flex gap-5">{children}</div>
      </div>
    </div>
  );
};

export default Dialog;
