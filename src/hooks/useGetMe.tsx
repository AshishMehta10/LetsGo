"use client";
import { setuserdata } from "@/redux/userSlice";
import axios from "axios";
import { error } from "console";
import React, { use, useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetMe(enabled: boolean) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!enabled) {
      return;
    }
    const getMe = async () => {
      try {
        const { data } = await axios.get("/api/auth/user/me");
        dispatch(setuserdata(data));
      } catch (error) {
        console.log(error);
      }
    };
    getMe();
  }, [enabled]);
}

export default useGetMe;
