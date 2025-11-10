

import { Logo } from "../icons/Logo";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export function Sharelink() {
  const location = useLocation();
  const shareurl = location.state?.shareurl ?? "No link provided";
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(shareurl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        navigate("/dashboard");
      }, 1200);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-purple-300 via-purple-200 to-blue-200">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="min-w-96 bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
      >
        <div className="flex items-center justify-center gap-2 text-xl text-purple-600 mb-6">
          <Logo />
          <b className="text-blue-500 shadow rounded">CortexMark</b>
        </div>

        <h2 className="text-center text-lg font-semibold text-gray-800">
          Copy the link and share
        </h2>

        <div className="mt-3 text-center">
          <p className="text-sm text-gray-600 break-all bg-gray-100 px-3 py-2 rounded-md shadow-inner">
            {shareurl}
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={copyToClipboard}
            className={`px-4 py-2 text-sm rounded-lg shadow-md transition-all ${
              copied
                ? "bg-green-500 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {copied ? "Copied!" : "Copy Link"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}


