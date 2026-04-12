"use client";
import React, { useState } from "react";
import { motion } from "framer-motion"; // ✅ FIXED
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AuthModel from "./AuthModel";

const NavItems = ["Home", "Bookings", "about us", "contact us"];

function NavBar() {
  const [authOPen, setAuthOpen] = useState(false);
  const pathname = usePathname();

  return (<>
    <motion.div
      key={pathname} // ✅ IMPORTANT
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

        <button className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition" onClick={()=>setAuthOpen(true)}>
          LogIn
        </button>
      </div>
      
    </motion.div>
    <AuthModel open={authOPen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

export default NavBar;
