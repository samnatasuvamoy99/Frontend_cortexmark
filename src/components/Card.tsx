import { motion } from "framer-motion";
import { DotsIcon } from "../icons/Card_share";
import { Openlogo } from "../icons/Open_Link";
import { Deletecard } from "../icons/deletecard";
import { useAppDispatch } from "../Store/hooks";
import { deleteContent } from "../Store/slices/contentSlice";
import { useState } from "react";


interface Cardprops {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "documents" | "account" | "others";
  _id?: string;
  onDelete?: () => void;
}

export function Card({ title, link, type, _id, onDelete }: Cardprops) {
  const [showFull, setShowFull] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    if (!_id) return;

    if (window.confirm("Are you sure you want to delete this content?")) {
      try {
        await dispatch(deleteContent(_id)).unwrap();
        alert("Content deleted successfully!");
        if (onDelete) onDelete();
      } catch (error) {
        console.error("Error deleting content:", error);
        alert("Failed to delete content. Please try again.");
      }
    }
  };

  const getYouTubeEmbedUrl = (url: string): string => {
    if (!url) return "";


    if (url.includes("/embed/")) {
      return url.split("?")[0]; // Remove query parameters
    }


    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }


    if (url.includes("watch?v=")) {
      const videoId = url.split("watch?v=")[1]?.split("&")[0];
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }


    if (url.includes("/v/")) {
      const videoId = url.split("/v/")[1]?.split("?")[0];
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }


    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }

    return url;
  };


  const getTwitterUrl = (url: string): string => {
    if (!url) return "";

    return url.replace(/x\.com/g, "twitter.com");
  };

  return (
    <div className="p-4 bg-white shadow-xl rounded-md border border-gray-200 hover:border-1 hover:border-blue-600 hover:shadow-2xl w-64 h-96 overflow-hidden flex flex-col">

      <div className="flex justify-between items-start mb-2">

        <div className="flex items-start">
          <div className="text-gray-500 pt-1 pr-3">
            <DotsIcon />
          </div>


          <div className="font-mono text-gray-800 max-w-[12rem]">
            <p
              className={`text-sm leading-snug ${showFull ? "line-clamp-none" : "line-clamp-2"
                }`}
            >
              {title}
            </p>

            {title.split(" ").length > 6 && (
              <button
                onClick={() => setShowFull((prev) => !prev)}
                className="text-purple-600 hover:underline font-semibold mt-1"
              >
                {showFull ? "less" : "more"}
              </button>
            )}
          </div>
        </div>


        <div className="flex items-center space-x-2 flex-shrink-0">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            title="Open link"
            className="p-1 rounded-md hover:text-purple-600 focus:outline-none"
          >
            <Openlogo />
          </a>

          {onDelete && (
            <button
              className="hover:text-red-500 cursor-pointer pb-1"
              onClick={handleDelete}
            >
              <Deletecard />
            </button>
          )}
        </div>
      </div>


      <div className="pt-3 flex-1">
        {type === "youtube" && link && (
          <iframe
            className="w-full h-32"
            src={getYouTubeEmbedUrl(link)}
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}

        {type === "twitter" && link && (
          <blockquote className="twitter-tweet">
            <a href={getTwitterUrl(link)}></a>
          </blockquote>
        )}

        {type === "documents" && link && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full h-40 rounded-2xl bg-gradient-to-br from-indigo-100/60 to-indigo-200/60 border border-indigo-300/40 shadow-md hover:shadow-xl flex flex-col items-center justify-center text-center p-4 cursor-pointer backdrop-blur-md"
          >
            <p className="text-gray-700 font-semibold mb-2 text-lg tracking-wide">
            Access Your Document!
            </p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 font-bold hover:underline hover:text-indigo-700 transition-colors duration-300"
            >
              View Document
            </a>
          </motion.div>
        )}

        {/* for link  */}
        {type === "others" && link && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full h-40 rounded-2xl bg-gradient-to-br from-blue-100/60 to-blue-200/60 border border-blue-300/40 shadow-md hover:shadow-xl flex flex-col items-center justify-center text-center p-4 cursor-pointer backdrop-blur-md"
          >
            <p className="text-gray-700 font-semibold mb-2 text-lg tracking-wide">
              Access External Resource!
            </p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-bold hover:underline hover:text-blue-700 transition-colors duration-300"
            >
              Visit Link
            </a>
          </motion.div>
        )}

      {/* for AllAccount */}

       {type === "account" && link && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05, rotate: 1 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="w-full h-40 rounded-2xl bg-gradient-to-br from-indigo-100/60 to-indigo-200/60 border border-indigo-300/40 shadow-md hover:shadow-xl flex flex-col items-center justify-center text-center p-4 cursor-pointer backdrop-blur-md"
  >
    <p className="text-gray-800 font-semibold text-lg tracking-wide mb-1">
       Access Your Saved Account
    </p>

    
    {title && (
      <p className="text-sm text-gray-600 mb-2 italic">
        {title}
      </p>
    )}

    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-600 font-bold hover:underline hover:text-indigo-700 transition-colors duration-300"
    >
      Visit Account
    </a>
  </motion.div>
)}
      </div>
    </div>
  );
}

