"use client";

import useAuthStore from "@/store/useAuthStore";
import { ReactNode, useEffect } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth) return <p>Please wait...</p>;
  return <>{children}</>;
};

export default AuthProvider;
