"use client";
import { useSession } from "next-auth/react";
import React, { ReactNode } from "react";
import useGetMe from "./hooks/useGetMe";

function InitUser({ children }: { children: ReactNode }) {
  const { status } = useSession();
  useGetMe({ enabled: status === "authenticated" });
  return null;
}

export default InitUser;
