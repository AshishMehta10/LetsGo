"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Bus, Bike, Car } from "lucide-react";
import { useRouter } from "next/navigation";

export const VEHICLES = [
  { id: "bike", label: "Bike", icon: Bike, desc: "2 wheeler" },
  { id: "auto", label: "Auto", icon: Car, desc: "3 wheeler ride" },
  { id: "car", label: "Car", icon: Car, desc: "4 wheeler ride" },
  { id: "loading", label: "Loading", icon: Bus, desc: "Small goods" },
];

export default function Page() {
  const router = useRouter();

  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");

  const isValid = vehicleType && vehicleNumber && vehicleModel;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <p className="text-sm text-gray-500">Step 1 of 3</p>
            <h1 className="text-xl font-semibold">Vehicle Details</h1>
          </div>
        </div>

        {/* Vehicle Selection */}
        <p className="text-sm font-medium mb-3">Vehicle Type</p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {VEHICLES.map((v) => {
            const Icon = v.icon;
            const active = vehicleType === v.id;

            return (
              <motion.div
                key={v.id}
                onClick={() => setVehicleType(v.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2
                ${active ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
              >
                <div
                  className={`p-3 rounded-full ${
                    active ? "bg-blue-500 text-white" : "bg-gray-100"
                  }`}
                >
                  <Icon size={20} />
                </div>
                <p className="font-medium">{v.label}</p>
                <p className="text-xs text-gray-500">{v.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Vehicle Model */}
        <div className="mb-4">
          <label className="text-sm font-medium">Vehicle Model</label>
          <input
            type="text"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
            placeholder="e.g. Honda Activa"
            className="w-full mt-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Vehicle Number */}
        <div className="mb-6">
          <label className="text-sm font-medium">Vehicle Number</label>
          <input
            type="text"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
            placeholder="e.g. MH12AB1234"
            className="w-full mt-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Continue Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={!isValid}
          onClick={() => {
            console.log({ vehicleType, vehicleModel, vehicleNumber });
            router.push("/partner/onboarding/next-step"); // change route
          }}
          className={`w-full py-3 rounded-lg font-medium transition
          ${
            isValid
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}
