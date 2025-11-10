import { useNavigate } from "react-router-dom";
import { Logo } from "../icons/Logo";

export function Navbar(){
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signin');
    };

     return (
       <div className="w-full bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-semibold text-purple-600">Second Brain</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-purple-600 transition-colors"
            >
                Dashboard
            </button>
            <button 
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
                Logout
            </button>
          </div>
       </div>
     )
}