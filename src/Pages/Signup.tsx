
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
      <div className="bg-gray-100 rounded-xl shadow-lg border min-w-96 h-90 p-6">
       
        <div className="flex gap-2 text-xl text-purple-500 justify-center items-center mb-6">
          <Logo />
          <b className="shadow rounded-md border px-2">CortexMark</b>
        </div>


        <div className="flex flex-col gap-3 mb-3">
          <Input reference={usernameRef} placeholder="Username" type="text" />
          <Input reference={emailRef} placeholder="Email" type="text" />
          <Input reference={passwordRef} placeholder="Password" type="password" />
        </div>

   
        <div className="flex justify-center">
          <Button
            onClick={signup}
            variant="primary"
            styleType="primarystyle"
            text="Signup"
            endIcon={<Submit />}
            fullwidth={true}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
