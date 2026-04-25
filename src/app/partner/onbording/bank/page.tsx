"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, CreditCard, Landmark, Phone } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    account: "",
    ifsc: "",
    phone: "",
    upi: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.name === "ifsc" ? e.target.value.toUpperCase() : e.target.value;

    setForm({ ...form, [e.target.name]: value });
  };

  const isValid = form.name && form.account && form.ifsc && form.phone;

  const InputRow = ({ icon: Icon, name, placeholder, value }: any) => (
    <div className="flex items-center gap-3 border-b pb-3">
      <Icon size={18} className="text-gray-400" />
      <input
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full outline-none bg-transparent text-sm placeholder-gray-400"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6"
      >
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.push("/partner/onbording/documents")}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="w-full text-center">
            <p className="text-xs text-gray-500">step 3 of 3</p>
            <h1 className="text-lg font-semibold">Bank & Payout Setup</h1>
            <p className="text-xs text-gray-400">Used for partner payouts</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <p className="text-xs text-gray-500 mb-1">Account holder name</p>
            <InputRow
              icon={User}
              name="name"
              value={form.name}
              placeholder="As per bank records"
            />
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Bank account number</p>
            <InputRow
              icon={CreditCard}
              name="account"
              value={form.account}
              placeholder="Enter account number"
            />
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">IFSC code</p>
            <InputRow
              icon={Landmark}
              name="ifsc"
              value={form.ifsc}
              placeholder="HDFC0001234"
            />
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Mobile number</p>
            <InputRow
              icon={Phone}
              name="phone"
              value={form.phone}
              placeholder="10 digit mobile number"
            />
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">UPI ID (optional)</p>
            <InputRow
              icon={CreditCard}
              name="upi"
              value={form.upi}
              placeholder="name@upi"
            />
          </div>
        </div>

        {/* Continue */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          disabled={!isValid}
          onClick={() => {
            console.log(form);
            router.push("/partner/dashboard");
          }}
          className={`w-full mt-6 py-3 rounded-lg text-sm font-medium transition
          ${
            isValid
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Finish
        </motion.button>
      </motion.div>
    </div>
  );
}
