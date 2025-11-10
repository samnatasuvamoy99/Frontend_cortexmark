
// import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Signup } from "./Pages/Signup";
import { Signin } from "./Pages/Signin";
import { Sharelink } from "./Pages/Sharelinkpage";
import { CreateContent } from "./Pages/CreateContent";
import { Dashboard } from "./Pages/Allcontents";
import { LandingPage } from "./Pages/LandingPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {

  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://platform.twitter.com/widgets.js"]'
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/createcontent"
          element={
            <ProtectedRoute>
              <CreateContent open={true} onClose={() => {}} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sharelink1"
          element={
            <ProtectedRoute>
              <Sharelink />
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/share/:hash" element={<Sharelink />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
