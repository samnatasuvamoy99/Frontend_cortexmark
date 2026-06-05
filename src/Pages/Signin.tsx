
// import { Input } from "../components/input";
// import { Button } from "../components/Button";
// import { Logo } from "../icons/Logo";
// import { Signinlogo } from "../icons/Signin";
// import { useRef, useState } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../Config";
// import { useNavigate, Link } from "react-router-dom";

// export function Signin() {
//   const [loading, setLoading] = useState(false);

//   const useremailRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);

//   const navigate = useNavigate();

//   const signin = async () => {
//     const email = useremailRef.current?.value;
//     const password = passwordRef.current?.value;

//     if (!email || !password) {
//       alert("Your information is incorrect!");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
//         email,
//         password,
//       });

//       alert("Welcome! You are signed in now.");

//       const jwt = response.data.token;
//       localStorage.setItem("token", jwt);

   
//       navigate("/dashboard");
//     } catch (err: any) {
//       console.error("Signin error:", err);
//       alert(err.response?.data?.message || "Signin failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen w-screen bg-purple-300 flex justify-center items-center">
//       <div className="bg-gray-100 rounded-xl min-w-96 h-90 shadow-lg border p-6">
//         {/* Logo */}
//         <div className="flex gap-2 text-xl text-purple-500 justify-center items-center mb-6">
//           <Logo />
//           <b className="shadow rounded-md border px-2">CortexMark</b>
//         </div>

//         <div className="flex flex-col gap-4 mb-6">
//           <Input reference={useremailRef} placeholder="Email" type="text" />
//           <Input reference={passwordRef} placeholder="Password" type="password" />
//         </div>


//         <div className="flex flex-col items-center gap-4">
//           <Button
//             onClick={signin}
//             variant="primary"
//             styleType="primarystyle"
//             text="Signin"
//             endIcon={<Signinlogo />}
//             fullwidth={true}
//             loading={loading}
//           />

//           <p className="text-sm mt-2">
//             Don’t have an account?{" "}
//             <Link to="/signup" className="text-purple-600 font-medium">
//               Signup
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Input } from "../components/input";
import { Button } from "../components/Button";
import { Logo } from "../icons/Logo";
import { Signinlogo } from "../icons/Signin";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../Config";
import { useNavigate, Link } from "react-router-dom";

export function Signin() {
  const [loading, setLoading] = useState(false);

  const useremailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const signin = async () => {
    const email = useremailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
        email,
        password,
      });
      alert("Welcome! You are signed in now.");
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Signin error:", err);
      alert(err.response?.data?.message || "Signin failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-purple-300 flex justify-center items-center">
      <div className="bg-gray-100 rounded-2xl shadow-lg border border-gray-200  min-w-96 h-86  p-8">

        {/* Logo */}
        <div className="flex gap-1.5 text-xl text-purple-600 justify-center items-center mb-1">
          <Logo />
          <b className="border px-2 py-0.5 rounded-md shadow-sm">
            CortexMark
          </b>
        </div>
        <p className="text-center text-sm text-gray-500 mb-6">
          Welcome back! Sign in to continue
        </p>

       

        {/* Fields */}
        <div className="flex flex-col gap-4 mb-2">

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
             
              Email address
            </label>
            <Input reference={useremailRef} placeholder="you@example.com" type="text" />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
             
              Password
            </label>
            <Input reference={passwordRef} placeholder="Enter your password" type="password" />
            <div className="flex justify-end mt-1">
              <Link to="/forgot-password" className="text-xs text-purple-600 hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

        </div>

        {/* Sign in Button */}
        <div className="flex justify-center  mt-5">
          <Button
            onClick={signin}
            variant="primary"
            styleType="primarystyle"
            text="Sign in"
            endIcon={<Signinlogo />}
            fullwidth={true}
            loading={loading}
          />
        </div>

        {/* Signup link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>

        

      </div>
    </div>
  );
}