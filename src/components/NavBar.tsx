"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion"; // ✅ FIXED
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AuthModel from "./AuthModel";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const NavItems = ["Home", "Bookings", "about us", "contact us"];

function NavBar() {
  const [authOPen, setAuthOpen] = useState(false);
  const pathname = usePathname();
  const { userData } = useSelector((state: RootState) => state.user);
  const [ProfileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed top-3 left-1/2 -translate-x-1/2 
w-[94%] md:w-[86%] 
z-50 rounded-full bg-[#0B0B0B] text-white 
shadow-[0_15px_50px_rgba(0,0,0,0.7)] py-2`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <Image
            src="/logo.png"
            alt="Rydex Logo"
            width={50}
            height={50}
            priority
          />

          <div className="md:flex items-center gap-10">
            {NavItems.map((i, index) => {
              let href;
              if (i === "Home") {
                href = "/";
              } else {
                href = `/${i.toLowerCase()}`;
              }

              const active = href === pathname;

              return (
                <Link
                  key={index}
                  href={href}
                  className={
                    active ? "text-white" : "text-gray-400 hover:text-white"
                  }
                >
                  {i}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-3 relative">
            <div className="hidden md:block relative">
              {!userData ? (
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition"
                  onClick={() => setAuthOpen(true)}
                >
                  LogIn
                </button>
              ) : (
                <>
                  <button onClick={() => setProfileOpen((p) => !p)}>
                    {userData.user.name.charAt(0).toUpperCase()}
                  </button>
                  <AnimatePresence>
                    {ProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 z-50"
                      >
                        <div className="bg-[#0B0B0B] text-white p-4 rounded-lg shadow-lg">
                          <p className="">{userData.user.name}</p>
                          <p className="">{userData.user.role}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      <AuthModel open={authOPen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

export default NavBar;
