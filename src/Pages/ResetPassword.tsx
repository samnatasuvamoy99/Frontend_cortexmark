import { Input } from "../components/input";
import { Button } from "../components/Button";
import { Logo } from "../icons/Logo";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../Config";
import { useParams, useNavigate, Link } from "react-router-dom";

export function ResetPassword() {
  const { token } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleReset = async () => {
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      await axios.post(`${BACKEND_URL}/api/v1/user/reset-password/${token}`, {
        password,
      });

      setMessage("Password reset successful! Redirecting to Signin page...");
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (err: any) {
      console.error("Reset password error:", err);
      setError(err.response?.data?.message || "Failed to reset password. The link might be invalid or expired.");
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
          Reset Password
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
              New Password
            </label>
            <Input reference={passwordRef} placeholder="Enter your new password" type="password" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Confirm New Password
            </label>
            <Input reference={confirmPasswordRef} placeholder="Confirm your new password" type="password" />
          </div>

          <div className="flex justify-center mt-4">
            <Button
              onClick={handleReset}
              variant="primary"
              styleType="primarystyle"
              text="Reset Password"
              fullwidth={true}
              loading={loading}
            />
          </div>
        </div>

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
