"use client";

import useAuthStore from "@/store/useAuthStore";
import { ReactNode, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth && !authUser) {
    return <p>Please wait...</p>;
  }
  return <>{children}</>;
};

export default AuthProvider;
