
// import { Input } from "../components/input";
// import { Button } from "../components/Button";
// import { Submit } from "../icons/Submit";
// import { Logo } from "../icons/Logo";
// import { useRef, useState } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../Config";
// import { useNavigate } from "react-router-dom";

// export function Signup() {
//   const [loading, setLoading] = useState(false);

//   const usernameRef = useRef<HTMLInputElement>(null);
//   const emailRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);

//   const navigate = useNavigate();

//   const signup = async () => {
//     const username = usernameRef.current?.value;
//     const email = emailRef.current?.value;
//     const password = passwordRef.current?.value;

//     if (!username || !email || !password) {
//       alert("Please fill in all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
//         username,
//         email,
//         password,
//       });

//        console.log(response);
//       alert("You have signed up successfully!");

     
//       navigate("/signin"); 
//     } catch (err: any) {
//       console.error("Signup error:", err);
//       alert(err.response?.data?.message || "Signup failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen w-screen bg-purple-300 flex justify-center items-center">
//       <div className="bg-gray-100 rounded-xl shadow-lg border min-w-96 h-90 p-6">
       
//         <div className="flex gap-2 text-xl text-purple-500 justify-center items-center mb-6">
//           <Logo />
//           <b className="shadow rounded-md border px-2">CortexMark</b>
//         </div>


//         <div className="flex flex-col gap-3 mb-3">
//           <Input reference={usernameRef} placeholder="Username" type="text" />
//           <Input reference={emailRef} placeholder="Email" type="text" />
//           <Input reference={passwordRef} placeholder="Password" type="password" />
//         </div>

   
//         <div className="flex justify-center">
//           <Button
//             onClick={signup}
//             variant="primary"
//             styleType="primarystyle"
//             text="Signup"
//             endIcon={<Submit />}
//             fullwidth={true}
//             loading={loading}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }



import { Input } from "../components/input";
import { Button } from "../components/Button";
import { Submit } from "../icons/Submit";
import { Logo } from "../icons/Logo";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../Config";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [loading, setLoading] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const signup = async () => {
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        username,
        email,
        password,
      });
      console.log(response);
      alert("You have signed up successfully!");
      navigate("/signin");
    } catch (err: any) {
      console.error("Signup error:", err);
      alert(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-purple-300 flex justify-center items-center">
      <div className="bg-gray-100 rounded-2xl shadow-lg border border-gray-200   min-w-96 h-90 p-6">

   
        <div className="flex gap-1 text-xl  text-purple-600 justify-center items-center mb-1">
          <Logo />
          <b className="border px-2 py-0.5 rounded-md ">CortexMark</b>
        </div>
        <p className="text-center text-sm text-gray-500 mb-6">
          Create your account to get started
        </p>

        {/* Divider */}
        {/* <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">
            Account details
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        */}
        <div className="flex flex-col gap-4 mb-4">

       
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
             
              Username
            </label>
            <Input reference={usernameRef} placeholder="e.g. johndoe" type="text" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
              
              Email address
            </label>
            <Input reference={emailRef} placeholder="you@example.com" type="text" />
            <p className="text-xs text-gray-400">We'll never share your email with anyone.</p>
          </div>

        
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
             
              Password
            </label>
            <Input reference={passwordRef} placeholder="Min. 8 characters" type="password" />
            <p className="text-xs text-gray-400">Use letters, numbers & symbols for a stronger password.</p>
          </div>

        </div>

        {/* Terms */}
        <div className="flex items-start gap-2 mb-5 text-xs text-gray-500">
          <input type="checkbox" className="mt-0.5 accent-purple-600" />
          <span>
            I agree to the{" "}
            <a href="#" className="text-purple-600 font-medium hover:underline">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="text-purple-600 font-medium hover:underline">Privacy Policy</a>
          </span>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            onClick={signup}
            variant="primary"
            styleType="primarystyle"
            text="Create account"
            endIcon={<Submit />}
            fullwidth={true}
            loading={loading}
          />
        </div>

        {/* Sign in link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/signin" className="text-purple-600 font-medium hover:underline">
            Sign in
          </a>
        </p>

      </div>
    </div>
  );
}