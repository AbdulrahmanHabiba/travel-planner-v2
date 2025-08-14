"use client";
import { useState, useRef, useEffect } from "react";
import {LoginButton} from "@/components/login-button";
import { LogIn } from "lucide-react";

export default function AuthDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative " ref={dropdownRef}>
    
      <button
              className="inline-flex items-center justify-center rounded-md p-2 sm:py-1  border border-card-main bg-surface text-main transition-colors"
        onClick={() => setIsOpen((prev) => !prev)}
            >

              <div className="flex w-auto">
                <span className="hidden sm:block mr-1">Sign In</span>
                <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg p-3 z-50">
          <LoginButton className="sm:flex-col" />
        </div>
      )}
    </div>
  );
}
