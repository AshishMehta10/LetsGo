"use client";

import { Bike, Bus, Car, CarTaxiFront } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const VEHICLE_CATEGORIES = [
  {
    title: "All Vehicles",
    desc: "Browse the full fleet",
    icon: CarTaxiFront,
    tag: "Popular",
  },
  { title: "Bikes", desc: "Fast & affordable rides", icon: Bike, tag: "Quick" },
  { title: "Cars", desc: "Comfortable city travel", icon: Car, tag: "Comfort" },
  { title: "SUVs", desc: "Premium & spacious", icon: Car, tag: "Premium" },
  { title: "Vans", desc: "Family & group transport", icon: Bus, tag: "Family" },
];

function VehicleSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  // 🔁 Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === VEHICLE_CATEGORIES.length - 1 ? 0 : prev + 1,
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // 🔄 Scroll to active card
  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const child = container.children[activeIndex];

      if (child) {
        child.scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
      }
    }
  }, [activeIndex]);

  return (
    <div className="px-4 py-10 flex justify-center">
      <div className="flex flex-wrap justify-center gap-6 max-w-6xl w-full">
        {VEHICLE_CATEGORIES.map((vehicle, index) => {
          const Icon = vehicle.icon;
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={vehicle.title}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`w-[220px] p-5 rounded-2xl flex flex-col items-center text-center cursor-pointer transition-all duration-300 border ${
                isActive
                  ? "bg-[#1a1a1a] border-white/20 shadow-lg scale-105"
                  : "bg-[#0f0f0f] border-white/10 hover:scale-105"
              }`}
            >
              {/* Icon */}
              <div className="p-3 rounded-full mb-3 bg-white/10">
                <Icon size={28} className="text-white" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white">
                {vehicle.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                {vehicle.desc}
              </p>

              {/* Tag */}
              <span className="mt-3 text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300 border border-white/10">
                {vehicle.tag}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default VehicleSlider;
