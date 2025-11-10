
import { ShareIcon } from "../icons/Shareicon";
import { Openlogo } from "../icons/Open_Link";
import { Deletecard } from "../icons/deletecard";
import { useAppDispatch } from "../Store/hooks";
import { deleteContent } from "../Store/slices/contentSlice";
import { useState } from "react";

interface Cardprops {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "documents" | "others";
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

  // Convert YouTube URL to embed format
  const getYouTubeEmbedUrl = (url: string): string => {
    if (!url) return "";
    
    // If already an embed URL, return as is
    if (url.includes("/embed/")) {
      return url.split("?")[0]; // Remove query parameters
    }
    
    // Handle youtu.be format
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    
    // Handle youtube.com/watch?v= format
    if (url.includes("watch?v=")) {
      const videoId = url.split("watch?v=")[1]?.split("&")[0];
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    
    // Handle youtube.com/v/ format
    if (url.includes("/v/")) {
      const videoId = url.split("/v/")[1]?.split("?")[0];
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    
    // Fallback: try to extract video ID from URL
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    
    return url; // Return original if we can't convert
  };

  // Normalize Twitter/X URL
  const getTwitterUrl = (url: string): string => {
    if (!url) return "";
    // Replace x.com with twitter.com for Twitter widget compatibility
    return url.replace(/x\.com/g, "twitter.com");
  };

  return (
    <div className="p-4 bg-white shadow-xl rounded-md border border-gray-200 hover:border-1 hover:border-blue-600 hover:shadow-2xl w-64 h-96 overflow-hidden flex flex-col">
     
      <div className="flex justify-between items-start mb-2">

        <div className="flex items-start">
          <div className="text-gray-500 pt-1 pr-3">
            <ShareIcon />
          </div>


          <div className="font-mono text-gray-800 max-w-[12rem]">
            <p
              className={`text-sm leading-snug ${
                showFull ? "line-clamp-none" : "line-clamp-2"
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
              className="hover:text-red-500 cursor-pointer"
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
          <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Document
            </a>
          </div>
        )}

        {type === "others" && link && (
          <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Open Link
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

