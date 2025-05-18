"use client";
import { GoBackButton } from "@/components/GoBackButton";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl: "/" });
  };

  return(
    <div className="w-full min-h-screen bg-gradient-to-b from-[#562626]/90 via-[#8a4141] to-[#f8f0e9] relative">
      <div className="absolute top-4 left-4">
        <GoBackButton/>
      </div>
      
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-8 p-6 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Sign in</h1>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#562626] focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer hover:-translate-y-1 transition-all duration-300"
          >
            {isLoading ? "Loading..." : "Sign in with Google"}
          </button>
        </div>
      </div>
    </div>
  );
}