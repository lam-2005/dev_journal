"use client";

import useAuthStore from "@/store/useAuthStore";
import { ReactNode, useEffect } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth && !authUser) {
    return <p>Please wait...</p>;
  }
  return <>{children}</>;
};

export default AuthProvider;
