// "use client";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";

// export function DotsIcon() {
//   const [showText, setShowText] = useState(false);

//   return (
//     <div className="relative flex flex-col items-center justify-center">
//       {/* Rotating Icon (no movement) */}
//       <motion.svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 24 24"
//         fill="black"
//         stroke="none"
//         className="size-6 cursor-pointer text-black"
//         whileHover={{ rotate: 20 }} // ✅ only rotation, no scaling or movement
//         transition={{ type: "spring", stiffness: 200, damping: 10 }}
//         onHoverStart={() => setShowText(true)}
//         onHoverEnd={() => setShowText(false)}
//       >
//         <path
//           fillRule="evenodd"
//           clipRule="evenodd"
//           d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
//         />
//       </motion.svg>

//       {/* Hover Text (Appears Below with Animation) */}
//       <AnimatePresence>
//         {showText && (
//           <motion.div
//             key="hover-text"
//             initial={{ opacity: 0, y: 8 }}
//             animate={{ opacity: 1, y: 4 }}
//             exit={{ opacity: 0, y: 8 }}
//             transition={{ duration: 0.3, ease: "easeOut" }}
//             className="text-xs text-gray-700 mt-1 font-medium"
//           >
//             Keep Explore! 
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }     

"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function DotsIcon() {
  const [showText, setShowText] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Fixed-position icon that only rotates + changes color */}
      <motion.div
        onHoverStart={() => setShowText(true)}
        onHoverEnd={() => setShowText(false)}
        className="flex flex-col items-center justify-center"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="black"
          stroke="none"
          className="size-6 cursor-pointer text-black"
          animate={{ rotate: showText ? 20 : 0 }}
          transition={{ type: "tween", duration: 0.3 }}
          style={{
            originX: "50%",
            originY: "50%",
            display: "block", // prevents inline SVG baseline shift
          }}
        >
          <motion.path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
            animate={{ fill: showText ? "#7C3AED" : "black" }} // 💜 purple on hover
            transition={{ duration: 0.3 }}
          />
        </motion.svg>
      </motion.div>

      {/* Smooth hover text below */}
      <AnimatePresence>
        {showText && (
          <motion.div
            key="hover-text"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 2 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-xs text-gray-700 mt-1 font-medium"
          >
            Keep Explore!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
