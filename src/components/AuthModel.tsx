"use client";
import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Circle,
  CircleDashed,
  CircleDashedIcon,
  Lock,
  Mail,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { button, s, tr } from "motion/react-client";
import { signIn, useSession } from "next-auth/react";
type propsTypes = {
  open: boolean;
  onClose: () => void;
};
type setType = "login" | "signup" | "otp";
function AuthModel({ open, onClose }: propsTypes) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<setType>("otp");
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState("");
  const session = useSession();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  console.log(session);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleOtpChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // 🔙 Backspace → move previous
      if (value === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      seterror("Passwords do not match.");
      return;
    }
    setLoading(true);
    // Implement sign-up logic here
    try {
      const { data } = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      console.log(data);

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      seterror(
        error.response.data.message || "An error occurred during sign-up.",
      );
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await signIn("google");
    setLoading(false);
  };

  const handleLogin = async () => {
    // Implement login logic here

    setLoading(true);
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
  };
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[90] backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 z-[90] flex items-center justify-center px-4"
            >
              <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto relative">
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 text-gray-500 hover:text-black transition"
                >
                  <X size={24} />
                </button>

                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2 tracking-wide">
                    Lets Go
                  </h2>
                  <p className="text-gray-600">
                    Please sign in to book your ride.
                  </p>
                </div>
                <button
                  className="w-full flex items-center justify-center gap-2 bg-white text-black py-2 rounded-lg font-semibold shadow-lg hover:bg-gray-200 transition"
                  onClick={handleGoogleLogin}
                >
                  <Image
                    src={"/google.png"}
                    alt="Google"
                    width={20}
                    height={20}
                  />
                  <span>Sign in with Google</span>
                </button>

                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <div className="text-gray-500 font-medium">OR</div>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
                {step === "login" && (
                  <div className="w-full">
                    {/* Email Field */}
                    <div className="relative mb-4">
                      <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        size={20}
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                      <Lock
                        size={20}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                      />

                      <input
                        type="password"
                        placeholder="Password"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <button
                      className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition"
                      onClick={handleLogin}
                    >
                      {!loading ? (
                        "Log In"
                      ) : (
                        <CircleDashedIcon
                          size={18}
                          color="white"
                          className="animate-spin justify-center"
                        />
                      )}
                    </button>
                    <p className="text-center mt-4 text-gray-600">
                      Don't have an account?{" "}
                      <button
                        onClick={() => setStep("signup")}
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        Sign up
                      </button>
                    </p>
                  </div>
                )}

                {step === "signup" && (
                  <div className="w-full">
                    {/* Email Field */}
                    <h1 className="text-2xl font-bold mb-4 tracking-wide text-center">
                      Create Account
                    </h1>
                    <div className="relative mb-4">
                      <User
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        size={20}
                      />
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="relative mb-4">
                      <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        size={20}
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                      <Lock
                        size={20}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                      />

                      <input
                        type="password"
                        placeholder="Password"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="relative mt-4">
                      <Lock
                        size={20}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                      />

                      <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    {error && (
                      <p className="text-red-500 mt-2 text-center">{error}</p>
                    )}
                    <button
                      className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition flex justify-center items-center"
                      disabled={loading}
                      onClick={handleSignUp}
                    >
                      {!loading ? (
                        "Sign Up"
                      ) : (
                        <CircleDashedIcon
                          size={18}
                          color="white"
                          className="animate-spin justify-center"
                        />
                      )}
                    </button>
                    <p className="text-center mt-4 text-gray-600">
                      Already have an account?{" "}
                      <span
                        onClick={() => setStep("login")}
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        Log in
                      </span>
                    </p>
                  </div>
                )}
                {step === "otp" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h1 className="text-2xl font-bold mb-4 tracking-wide text-center">
                      Enter OTP sent to your email
                    </h1>
                    <div className="flex gap-2 justify-center">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          type="text"
                          ref={(el) => {
                            inputRefs.current[i] = el;
                          }}
                          maxLength={1}
                          className="w-12 h-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-center text-lg"
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                        />
                      ))}
                    </div>
                    <div>
                      <button className="px-3 max-w-xs mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition justify-center flex items-center mx-auto">
                        Verify OTP
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default AuthModel;
