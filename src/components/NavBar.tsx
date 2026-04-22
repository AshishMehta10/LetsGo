"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion"; // ✅ FIXED
import Image from "next/image";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import AuthModel from "./AuthModel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  Bike,
  Bus,
  Car,
  ChevronRightIcon,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { setuserdata } from "@/redux/userSlice";
import { set } from "mongoose";

const NavItems = ["Home", "Bookings", "about us", "contact us"];

function NavBar() {
  const [authOPen, setAuthOpen] = useState(false);
  const pathname = usePathname();
  const { userData } = useSelector((state: RootState) => state.user);
  const [ProfileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await signOut({ redirect: false });
    dispatch(setuserdata(null));
    setProfileOpen(false);
  };

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

          <div className="hidden md:flex items-center gap-10">
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
                        <div className="bg-[#0B0B0B] text-white p-4 rounded-xl shadow-xl space-y-4">
                          {/* User Info */}
                          <div>
                            <p className="text-lg font-semibold">
                              {userData.user.name}
                            </p>
                            <p className="text-sm text-gray-400">
                              {userData.user.role}
                            </p>
                          </div>

                          {/* Partner CTA */}
                          {userData.user.role !== "partner" && (
                            <div className="flex items-center justify-between bg-gradient-to-r from-[#1a1a1a] to-[#222] p-3 rounded-lg cursor-pointer hover:bg-[#2a2a2a] transition-all duration-200">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center">
                                  <Bike
                                    className="-mr-1 text-yellow-400"
                                    size={18}
                                  />
                                  <Car
                                    className="-mr-1 text-yellow-400"
                                    size={18}
                                  />
                                  <Bus className="text-yellow-400" size={18} />
                                </div>

                                <span className="text-sm font-semibold">
                                  Start Earning
                                </span>
                              </div>

                              <ChevronRightIcon
                                size={18}
                                className="text-gray-400"
                              />
                            </div>
                          )}

                          {/* Logout */}
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-full font-semibold shadow-lg hover:bg-red-700 transition"
                          >
                            <LogOut size={18} className="mr-2" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
            <div className="md:hidden">
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
                </>
              )}
            </div>
            <div>
              <button
                onClick={() => setMenuOpen((p) => !p)}
                className="md:hidden relative z-[60] text-white"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute right-0 mt-17 w-48 z-50"
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed top-16 left-1/2 -translate-x-1/2 w-[92%] max-w-sm z-50 md:hidden"
            >
              <div className="bg-[#0B0B0B] text-white p-5 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-md flex flex-col gap-2">
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {ProfileOpen && userData && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setProfileOpen(false)} // ✅ FIXED
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ duration: 0.25 }}
              className="fixed bottom-0 left-0 w-full z-50 md:hidden"
            >
              <div className="bg-[#0B0B0B]/95 backdrop-blur-xl text-white p-5 rounded-t-3xl shadow-2xl border-t border-white/10 space-y-5">
                {/* Drag Handle */}
                <div className="w-12 h-1.5 bg-gray-600 rounded-full mx-auto" />

                {/* User Info */}
                <div className="text-center">
                  <p className="text-lg font-semibold tracking-wide">
                    {userData.user.name}
                  </p>
                  <p className="text-sm text-gray-400">{userData.user.role}</p>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10" />

                {/* Partner CTA */}
                {userData.user.role !== "partner" && (
                  <div className="flex items-center justify-between bg-gradient-to-r from-[#1a1a1a] to-[#222] p-4 rounded-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center">
                        <Bike className="-mr-1 text-yellow-400" size={18} />
                        <Car className="-mr-1 text-yellow-400" size={18} />
                        <Bus className="text-yellow-400" size={18} />
                      </div>

                      <span className="text-sm font-semibold">
                        Start Earning
                      </span>
                    </div>

                    <ChevronRightIcon size={18} className="text-gray-400" />
                  </div>
                )}

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-xl font-semibold shadow-lg hover:bg-red-700 active:scale-[0.98] transition-all"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AuthModel open={authOPen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

export default NavBar;
