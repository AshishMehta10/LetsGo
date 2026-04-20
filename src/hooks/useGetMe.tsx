"use client";
import { setuserdata } from "@/redux/userSlice";
import axios from "axios";
import { error } from "console";
import React, { use, useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetMe(enabled: boolean) {
  const dispatch = useDispatch();

  useEffect(() => {
    const getMe = async () => {
      if (!enabled) {
        return;
      }
      const { data } = await axios.get("/api/auth/user/me");
      dispatch(setuserdata(data));
    };
    getMe();
  }, [enabled]);
}

export default useGetMe;
