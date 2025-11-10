

import { Logo } from "../icons/Logo";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import { BACKEND_URL } from "../Config";
import axios from "axios";

interface SharedContent {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube" | "documents" | "others";
}

export function Sharelink() {
  const location = useLocation();
  const { hash } = useParams<{ hash: string }>();
  const shareurl = location.state?.shareurl;
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [sharedContent, setSharedContent] = useState<SharedContent[]>([]);
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");


  useEffect(() => {
    if (hash) {
      setLoading(true);
      axios
        .get(`${BACKEND_URL}/api/v1/links/brain/${hash}`)
        .then((response) => {
          setSharedContent(response.data.content || []);
          setUsername(response.data.username || "");
          setLoading(false);
          
     
          setTimeout(() => {
            if (window.twttr && window.twttr.widgets) {
              window.twttr.widgets.load();
            }
          }, 1000);
        })
        .catch((err) => {
          console.error("Error fetching shared content:", err);
          setError(err.response?.data?.message || "Failed to load shared content");
          setLoading(false);
        });
    }
  }, [hash]);

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

  if (hash) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-center gap-2 text-xl text-purple-600 mb-6 pt-4">
            <Logo />
            <b className="text-blue-500 shadow rounded">CortexMark</b>
          </div>

          {loading ? (
            <div className="text-center text-gray-500 mt-8">
              <p>Loading shared content...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 mt-8">
              <p>{error}</p>
            </div>
          ) : (
            <>
              {username && (
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                  {username}'s Shared Content
                </h2>
              )}

           
              <div className="flex mt-2 gap-10 flex-row p-4 flex-wrap justify-center">
                {sharedContent && sharedContent.length > 0 ? (
                  sharedContent.map((content, index) => (
                    <div className="border-gray-400" key={content._id || index}>
                      <Card
                        type={content.type}
                        link={content.link}
                        title={content.title}
                        _id={content._id}
                        // Don't show delete button for shared content
                        onDelete={undefined}
                      />
                    </div>
                  ))
                ) : (
                  <div className="w-full text-center text-gray-500 mt-8">
                    <p>No content available to share.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
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
            {shareurl || "No link provided"}
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


