"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function DotsIcon() {
  const [showText, setShowText] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Stable wrapper prevents movement */}
      <div className="flex items-center justify-center w-6 h-6">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={showText ? "#7C3AED" : "black"} // 💜 color changes on hover
          stroke="none"
          className="w-6 h-6 cursor-pointer"
          whileHover={{ rotate: 20 }} // ✅ rotation only
          transition={{ type: "tween", duration: 0.3 }}
          onHoverStart={() => setShowText(true)}
          onHoverEnd={() => setShowText(false)}
          style={{
            transformBox: "fill-box", // ✅ ensures rotation around SVG bounds
            transformOrigin: "center", // ✅ keeps center rotation fixed
            display: "block",
            willChange: "transform",
          }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
          />
        </motion.svg>
      </div>

      {/* Smooth appearing hover text */}
      <AnimatePresence>
        {showText && (
          <motion.div
            key="hover-text"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-xs text-gray-700 mt-1 font-medium select-none"
          >
            Keep Explore!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
