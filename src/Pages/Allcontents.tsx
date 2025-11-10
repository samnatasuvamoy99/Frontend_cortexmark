
import { Button } from "../components/Button";
import { ShareIcon } from "../icons/Shareicon";
import { PlusIcon } from '../icons/PlusIcon';
import { Card } from "../components/Card"
import { CreateContent } from "./CreateContent"
import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { fetchContent, deleteContent } from "../Store/slices/contentSlice";
import { BACKEND_URL } from "../Config"
import axios from "axios"
import { useNavigate } from "react-router-dom";


export function Dashboard() {
    const [modelOpen, SetmodelOpen] = useState(false);
    const dispatch = useAppDispatch();
    const { items: contents, loading } = useAppSelector(state => state.content);
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

 
    const filteredContents = contents.filter(content => {
        if (activeFilter === 'all') return true;
        return content.type === activeFilter;
    });

    const handleDelete = async (contentId: string) => {
        dispatch(deleteContent(contentId));
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
        {/* Header */}
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {activeFilter === "all"
              ? "All Content"
              : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Content`}
          </h2>
          <span className="text-sm text-gray-500">
            {filteredContents.length} item
            {filteredContents.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Buttons */}
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

                const shareurl = `http://localhost:5173/share/${responce.data.hash}`;
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

      {/* Cards */}
      <div className="flex mt-2 gap-10 flex-row p-4 flex-wrap">
        {loading ? (
          <div className="w-full text-center text-gray-500 mt-8">
            <p>Loading content...</p>
          </div>
        ) : filteredContents && filteredContents.length > 0 ? (
          filteredContents.map(({ type, link, title, _id }, index) => (
            <div className="border-gray-400" key={_id ?? index}>
              <Card
                type={type}
                link={link}
                title={title}
                _id={_id}
                onDelete={() => handleDelete(_id)}
              />
            </div>
          ))
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