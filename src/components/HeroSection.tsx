"use client";
import React from "react";
import { motion } from "motion/react";
import { Bike, Bus, Car } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

function HeroSection({ onAuthRequired }: { onAuthRequired: () => void }) {
  const { userData } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/hero.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-black/80" />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white font-extrabold text-2xl sm:text-8xl md:text-4xl"
        >
          Book Your Ride, Anytime, Anywhere
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-gray-300 max-w-xl text-xl"
        >
          Get there, faster and easier than ever before
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex gap-12 text-gray-300 "
        >
          <Bike size={40} />
          <Car size={40} />
          <Bus size={40} />
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          whileHover={{
            scale: 1.08,
            transition: { duration: 0.15 }, // fast hover
          }}
          whileTap={{
            scale: 0.95,
            transition: { duration: 0.1 }, // instant click
          }}
          className="mt-10 px-8 py-4 bg-blue-600 text-white rounded-full font-semibold shadow-lg"
          onClick={() => {
            !userData ? onAuthRequired() : router.push("/user/book");
          }}
        >
          Book Now
        </motion.button>
      </div>
    </div>
  );
}

export default HeroSection;
