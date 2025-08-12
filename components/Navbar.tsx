"use client";

import { login, logout } from "@/lib/auth-actions";
import { Session } from "next-auth";
import Link from "next/link";
import UserAvatar from "@/components/ui/avatar";
import { LogIn, LogOut, Sun, Moon, MapPinCheck, Plane, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar({ session }: { session: Session | null }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="bg-surface text-main shadow-md py-3 sm:py-4 border-b">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <Link href={"/"} className="flex items-center space-x-2">
          <MapPinCheck className="w-10 h-10 " />
          <span className="text-lg sm:text-2xl font-bold text-main">
            Travel Planner
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          {session ? (
            <>
              <Link
                href={"/trips"}
                className="text-main hover:text-sky-500 transition-colors text-sm lg:text-base"
              >
                <span className="hidden sm:inline">My Trips</span>
                <span className="sm:hidden">
                  <Plane className="w-5 h-5" />
                </span>
              </Link>
              <Link
                href={"/globe"}
                className="text-main hover:text-sky-500 transition-colors text-sm lg:text-base"
              >
                <span className="hidden sm:inline">Globe</span>
                <span className="sm:hidden">
                  <Globe className="w-5 h-5" />
                </span>
              </Link>

              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  href="/profile"
                  className="transition-transform hover:scale-105"
                >
                  <UserAvatar user={session.user} size="sm" />
                </Link>


                <button
                  className="inline-flex items-center justify-center rounded-md p-2 sm:py-1  border border-card-main bg-surface text-main transition-colors"
                  onClick={logout}
                >

                  <div className="flex w-auto">
                    <span className="hidden sm:block mr-1">Sign Out</span>
                    <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </button>
              </div>
            </>
          ) : (
            <button
              className="inline-flex items-center justify-center rounded-md p-2 sm:py-1  border border-card-main bg-surface text-main transition-colors"
              onClick={login}
            >

              <div className="flex w-auto">
                <span className="hidden sm:block mr-1">Sign In</span>
                <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </button>
          )}

          <button
            aria-label="Toggle theme"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="inline-flex items-center justify-center rounded-md p-2 border border-card-main bg-surface text-main transition-colors"

          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}