"use client";
import axios from "axios";
import { error } from "console";
import React, { use, useEffect } from "react";

function useGetMe({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) {
      return;
    }
    const getMe = async () => {
      const { data } = await axios.get("/api/auth/user/me");
      console.log(data);
    };
    getMe();
  }, [enabled]);
}

export default useGetMe;
