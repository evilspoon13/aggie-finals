"use client";

import { RiUserLine, RiLoginBoxLine, RiLogoutBoxLine, RiCalendar2Fill } from "react-icons/ri";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Settings() {

  const { data: session, status } = useSession();
  const router = useRouter();
  const isAuthenticated = status === "authenticated" && session;

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  const handleScheduleRedirect = () => {
    router.push("/schedule");
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="relative w-12 h-12 rounded-full overflow-hidden cursor-pointer">
            {isAuthenticated && session.user?.image ? (
              <Image 
                src={session.user.image} 
                alt={session.user.name || "User profile"} 
                width={48} 
                height={48} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-400 flex items-center justify-center">
                <RiUserLine className="text-white w-6 h-6" />
              </div>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          {isAuthenticated ? (
            <>
                <DropdownMenuItem 
                    className="flex items-center justify-center gap-2"
                    onSelect={(e) => e.preventDefault()}
                    onClick={handleLogout}
                >
                <div className="flex items-center justify-center gap-2 w-full cursor-pointer">
                    <RiLogoutBoxLine className="w-5 h-5 text-gray-400"/>
                    <span>Sign out</span>
                </div>
                </DropdownMenuItem>

                <DropdownMenuItem 
                    className="flex items-center justify-center gap-2"
                    onSelect={(e) => e.preventDefault()}
                    onClick={handleScheduleRedirect}
                >
                    <div className="flex items-center justify-center gap-2 w-full cursor-pointer">
                        <RiCalendar2Fill className="w-5 h-5 text-gray-400"/>
                        <span>Schedule</span>
                    </div>
                </DropdownMenuItem>
            </>

          ) : (
            <DropdownMenuItem 
              className="flex items-center justify-center gap-2"
              onSelect={(e) => e.preventDefault()}
              onClick={handleGoogleLogin}
            >
              <div className="flex items-center justify-center gap-2 w-full cursor-pointer">
                <RiLoginBoxLine className="w-5 h-5 text-gray-400"/>
                <span>Sign in</span>
              </div>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}