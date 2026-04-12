"use client";
import React from "react";
import HeroSection from "./HeroSection";
import VechileSlider from "./VechileSlider";
import AuthModel from "./AuthModel";
function PublicHome() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <HeroSection onAuthRequired={() => setOpen(true)} />
      <VechileSlider />
      <AuthModel open={open} onClose={() => setOpen(false)} />
    </>
  );
}
export default PublicHome;
