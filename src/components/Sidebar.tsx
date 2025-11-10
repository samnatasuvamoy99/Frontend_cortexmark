
import { SiderbarItem } from "./Sidebar-items"
import { TwitterIcon } from "../icons/Twitter";
import { YoutubeIcon } from "../icons/Youtube";
import { LinkIcon } from "../icons/Link";
import { DocumentIcon } from "../icons/Document";
import { TagIcon } from "../icons/Tag";
import { Logo } from "../icons/Logo"
import { useNavigate } from "react-router-dom";

export function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-300 flex flex-col justify-between z-50">
      {/* Header */}
      <div>
        <div className="flex gap-2 text-xl pt-6 items-center pl-6">
          <Logo />
          <b className="text-purple-600 text-2xl">CortexMark</b>
        </div>

     
        <div className="pt-8 flex flex-col gap-2">
          <SiderbarItem text="All Content" icon={<TagIcon />} filterType="all" />
          <SiderbarItem text="Twitter" icon={<TwitterIcon />} filterType="twitter" />
          <SiderbarItem text="Videos" icon={<YoutubeIcon />} filterType="youtube" />
          <SiderbarItem text="Documents" icon={<DocumentIcon />} filterType="documents" />
          <SiderbarItem text="Others" icon={<LinkIcon />} filterType="others" />
        </div>
      </div>


      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

