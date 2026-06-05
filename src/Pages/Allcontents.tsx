
import { Button } from "../components/Button";
import { ShareIcon } from "../icons/Shareicon";
import { PlusIcon } from '../icons/PlusIcon';
import { Card } from "../components/Card";
import { CreateContent } from "./CreateContent";
import { TwitterIcon } from "../icons/Twitter";
import { YoutubeIcon } from "../icons/Youtube";
import { Deletecard } from "../icons/deletecard";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Sidebar } from "../components/Sidebar";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { fetchContent, deleteContent } from "../Store/slices/contentSlice";
import { BACKEND_URL } from "../Config"
import axios from "axios"
import { useNavigate } from "react-router-dom";


const getYouTubeVideoId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2]?.length === 11) ? match[2] : null;
};

export function Dashboard() {
  const [modelOpen, SetmodelOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { items: contents, loading, error } = useAppSelector(state => state.content);
  const activeFilter = useAppSelector(state => state.filter.activeFilter);
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);


  useEffect(() => {
    if (!modelOpen) {
      dispatch(fetchContent());
    }
  }, [modelOpen, dispatch]);


  useEffect(() => {
    if (contents.length > 0) {

      const reloadTwitterWidgets = () => {
        if (window.twttr && window.twttr.widgets) {
          window.twttr.widgets.load();
        } else {

          setTimeout(reloadTwitterWidgets, 500);
        }
      };
      reloadTwitterWidgets();
    }
  }, [contents]);


  const filteredContents = [...contents]
    .sort((a, b) => {
      if (activeFilter === 'history') {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      }
      return 0;
    })
    .filter(content => {
      if (activeFilter === 'all' || activeFilter === 'history') return true;
      return content.type === activeFilter;
    });

  const handleDelete = async (contentId: string) => {
    if (!contentId) return;
    if (window.confirm("Are you sure you want to delete this content?")) {
      try {
        await dispatch(deleteContent(contentId)).unwrap();
        alert("Content deleted successfully!");
      } catch (error) {
        console.error("Error deleting content:", error);
        alert("Failed to delete content. Please try again.");
      }
    }
  };

  return (

    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100 pl-64">
        <CreateContent
          open={modelOpen}
          onClose={() => SetmodelOpen(false)}
        />

        <div className="flex justify-between items-center mt-3 p-4">

          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {activeFilter === "all"
                ? "All Content"
                : activeFilter === "history"
                  ? "History"
                  : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Content`}
            </h2>
            <span className="text-sm text-gray-500">
              {filteredContents.length} item
              {filteredContents.length !== 1 ? "s" : ""}
            </span>
          </div>


          <div className="flex gap-3">
            <Button

              variant="primary"
              styleType="primarystyle"
              text="Add Content"
              startIcon={<PlusIcon />}
              onClick={() => SetmodelOpen(true)}
            />
            <Button
              onClick={async () => {
                try {
                  const responce = await axios.post(
                    `${BACKEND_URL}/api/v1/links/brain/share`,
                    { share: true },
                    {
                      headers: {
                        Authorization: localStorage.getItem("token"),
                      },
                    }
                  );


                  const frontendUrl = import.meta.env.VITE_FRONTEND_URL || window.location.origin;
                  const shareurl = `${frontendUrl}/share/${responce.data.hash}`;
                  navigate("/sharelink1", { state: { shareurl } });
                } catch (error) {
                  console.error("Error sharing brain:", error);
                  alert("Failed to share brain. Please try again.");
                }
              }}
              variant="secondary"
              styleType="secondarystyle"
              text="Share Brain"
              startIcon={<ShareIcon />}

            />
          </div>
        </div>

        <div className={activeFilter === "history" ? "flex flex-col mt-2 p-4 gap-4 w-full max-w-4xl mx-auto" : "flex mt-2 gap-10 flex-row p-4 flex-wrap"}>
          {loading ? (
            <div className="w-full text-center text-gray-500 mt-8">
              <p>Loading content...</p>
            </div>
          ) : error ? (
            <div className="w-full text-center text-red-500 mt-8 font-medium">
              <p>{error}</p>
            </div>
          ) : filteredContents && filteredContents.length > 0 ? (
            activeFilter === "history" ? (
              filteredContents.map(({ type, link, title, _id, createdAt }, index) => {
                let previewElement: ReactNode = null;
                let badgeColor = "";

                if (type === "twitter") {
                  badgeColor = "bg-blue-50 text-blue-600 border-blue-100";
                  previewElement = (
                    <div className="w-36 h-20 bg-blue-50 border border-blue-100 rounded-lg flex flex-col justify-between p-2 flex-shrink-0">
                      <div className="flex items-center gap-1.5">
                        <TwitterIcon />
                        <span className="text-[10px] font-semibold text-blue-700">Twitter Post</span>
                      </div>
                      <p className="text-[9px] text-gray-600 line-clamp-2 leading-tight">
                        {title}
                      </p>
                    </div>
                  );
                } else if (type === "youtube") {
                  badgeColor = "bg-red-50 text-red-600 border-red-100";
                  const videoId = getYouTubeVideoId(link);
                  previewElement = (
                    <div className="relative w-36 h-20 rounded-lg overflow-hidden border border-gray-200 shadow-sm flex-shrink-0 bg-black flex items-center justify-center">
                      {videoId ? (
                        <>
                          <img
                            src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                            className="w-full h-full object-cover"
                            alt="YouTube thumbnail"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                            <svg className="w-6 h-6 text-white filter drop-shadow-sm" fill="currentColor" viewBox="0 0 84 84">
                              <circle cx="42" cy="42" r="40" fill="red" />
                              <path d="M35 28l18 14-18 14V28z" fill="white" />
                            </svg>
                          </div>
                        </>
                      ) : (
                        <YoutubeIcon />
                      )}
                    </div>
                  );
                } else if (type === "documents") {
                  badgeColor = "bg-indigo-50 text-indigo-600 border-indigo-100";
                  previewElement = (
                    <div className="w-36 h-20 bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-lg flex flex-col items-center justify-center p-1.5 flex-shrink-0">
                      <span className="text-[10px] font-semibold text-indigo-700 tracking-wide">Document</span>
                      <span className="text-[8px] text-indigo-500 font-bold underline mt-1">View Resource</span>
                    </div>
                  );
                } else if (type === "account") {
                  badgeColor = "bg-green-50 text-green-600 border-green-100";
                  previewElement = (
                    <div className="w-36 h-20 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg flex flex-col items-center justify-center p-1.5 flex-shrink-0">
                      <span className="text-[10px] font-semibold text-green-700 tracking-wide">Account</span>
                      <span className="text-[8px] text-green-500 font-bold underline mt-1">Visit Saved URL</span>
                    </div>
                  );
                } else {
                  badgeColor = "bg-gray-100 text-gray-600 border-gray-200";
                  previewElement = (
                    <div className="w-36 h-20 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg flex flex-col items-center justify-center p-1.5 flex-shrink-0">
                      <span className="text-[10px] font-semibold text-gray-700 tracking-wide">Web Link</span>
                      <span className="text-[8px] text-gray-500 font-bold underline mt-1">Visit Site</span>
                    </div>
                  );
                }

                return (
                  <div
                    key={_id ?? index}
                    className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 group w-full"
                  >
                    {/* Left Section: Info */}
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2 text-xs">
                        <span className={`px-2 py-0.5 rounded-full border text-[11px] font-medium capitalize ${badgeColor}`}>
                          {type === "youtube" ? "video" : type}
                        </span>
                        {createdAt && (
                          <span className="text-gray-400">
                            • Added on {new Date(createdAt).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </span>
                        )}
                      </div>

                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-900 font-semibold text-base truncate group-hover:text-purple-600 group-hover:underline block"
                      >
                        {title}
                      </a>

                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-400 truncate max-w-md block"
                      >
                        {link}
                      </a>
                    </div>

                    {/* Right Section: Delete + Small box picture */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <button
                        onClick={() => handleDelete(_id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete from history"
                      >
                        <Deletecard />
                      </button>

                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-transform group-hover:scale-105"
                        title="Open Resource"
                      >
                        {previewElement}
                      </a>
                    </div>
                  </div>
                );
              })
            ) : (
              filteredContents.map(({ type, link, title, _id, createdAt }, index) => (
                <div className="border-gray-400" key={_id ?? index}>
                  <Card
                    type={type}
                    link={link}
                    title={title}
                    _id={_id}
                    createdAt={createdAt}
                    onDelete={() => handleDelete(_id)}
                  />
                </div>
              ))
            )
          ) : (
            <div className="w-full text-center text-gray-500 mt-8">
              <p>
                {activeFilter === "all"
                  ? "No content available. Click 'Add Content' to get started!"
                  : `No ${activeFilter} content available.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

}