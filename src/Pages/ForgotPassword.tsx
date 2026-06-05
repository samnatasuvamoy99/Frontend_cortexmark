import { Input } from "../components/input";
import { Button } from "../components/Button";
import { Logo } from "../icons/Logo";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../Config";
import { Link } from "react-router-dom";

export function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [simulatedLink, setSimulatedLink] = useState("");
  
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const email = emailRef.current?.value;

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");
      setSimulatedLink("");
      
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/forgot-password`, { email });
      
      setMessage("If that email exists, we have generated a reset link.");
      if (response.data.resetUrl) {
        setSimulatedLink(response.data.resetUrl);
      }
    } catch (err: any) {
      console.error("Forgot password error:", err);
      setError(err.response?.data?.message || "Failed to request password reset. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-purple-300 flex justify-center items-center">
      <div className="bg-gray-100 rounded-2xl shadow-lg border border-gray-200 min-w-[28rem] p-8">
        
        {/* Logo */}
        <div className="flex gap-1.5 text-xl text-purple-600 justify-center items-center mb-1">
          <Logo />
          <b className="border px-2 py-0.5 rounded-md shadow-sm">
            CortexMark
          </b>
        </div>
        <p className="text-center text-sm text-gray-500 mb-6">
          Forgot Password
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 mb-4 text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg border border-green-100 mb-4 text-center">
            {message}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Email address
            </label>
            <Input reference={emailRef} placeholder="you@example.com" type="text" />
          </div>

          <div className="flex justify-center mt-2">
            <Button
              onClick={handleSubmit}
              variant="primary"
              styleType="primarystyle"
              text="Request Reset Link"
              fullwidth={true}
              loading={loading}
            />
          </div>
        </div>

        {simulatedLink && (
          <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-100 text-center animate-fade-in">
            <p className="text-xs text-purple-700 font-semibold mb-2">
              Simulated Reset Link (Dev Mode):
            </p>
            <a
              href={simulatedLink.replace('http://localhost:5173', window.location.origin)}
              className="text-sm text-purple-600 underline font-medium break-all hover:text-purple-800"
            >
              Reset Password Now
            </a>
          </div>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          Back to{" "}
          <Link to="/signin" className="text-purple-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}
