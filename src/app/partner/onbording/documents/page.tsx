"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, UploadCloud, FileCheck } from "lucide-react";
import { useRouter } from "next/navigation";

const DOCS = [
  {
    id: "aadhaar",
    title: "Aadhaar / ID Proof",
    subtitle: "Government issued ID",
  },
  {
    id: "license",
    title: "Driving License",
    subtitle: "Valid driving license",
  },
  {
    id: "rc",
    title: "Vehicle RC",
    subtitle: "Registration Certificate",
  },
];

export default function Page() {
  const router = useRouter();

  const [files, setFiles] = useState<Record<string, File | null>>({
    aadhaar: null,
    license: null,
    rc: null,
  });

  const handleUpload = (id: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [id]: file }));
  };

  const isValid = Object.values(files).every((f) => f !== null);

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

          <div className="w-full text-center">
            <p className="text-sm text-gray-500">Step 2 of 3</p>
            <h1 className="text-xl font-semibold">Upload Documents</h1>
            <p className="text-sm text-gray-500">Required for verification</p>
          </div>
        </div>

        {/* Document Cards */}
        <div className="space-y-4">
          {DOCS.map((doc) => {
            const uploaded = files[doc.id];

            return (
              <div
                key={doc.id}
                className="flex items-center justify-between border rounded-xl p-4"
              >
                <div>
                  <p className="font-medium">{doc.title}</p>
                  <p className="text-sm text-gray-500">{doc.subtitle}</p>
                </div>

                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleUpload(doc.id, e.target.files?.[0] || null)
                    }
                  />

                  <div className="flex flex-col items-center">
                    <p className="text-xs text-gray-400 mb-1">
                      {uploaded ? "Uploaded" : "Upload"}
                    </p>

                    <div
                      className={`p-3 rounded-full ${
                        uploaded
                          ? "bg-green-500 text-white"
                          : "bg-black text-white"
                      }`}
                    >
                      {uploaded ? (
                        <FileCheck size={18} />
                      ) : (
                        <UploadCloud size={18} />
                      )}
                    </div>
                  </div>
                </label>
              </div>
            );
          })}
        </div>

        {/* Info */}
        <p className="text-xs text-gray-500 mt-4 flex items-center gap-2">
          <FileCheck size={14} />
          Documents are securely stored and manually verified by our team.
        </p>

        {/* Continue Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={!isValid}
          onClick={() => router.push("/partner/onboarding/step-3")}
          className={`w-full mt-6 py-3 rounded-lg font-medium transition
          ${
            isValid
              ? "bg-black text-white hover:opacity-90"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}
