
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

          <button
            className="hover:text-red-500 cursor-pointer"
            onClick={handleDelete}
          >
            <Deletecard />
          </button>
        </div>
      </div>

    
      <div className="pt-3 flex-1">
        {type === "youtube" && link && (
          <iframe
            className="w-full h-32"
            src={link.replace("watch", "embed").replace("?v=", "/")}
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}

        {type === "twitter" && link && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
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

