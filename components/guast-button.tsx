
"use client";
import { useRouter } from "next/navigation";

export default function GuestButton() {
  const router = useRouter();

  const handleGuestLogin = async () => {
    const res = await fetch("/api/auth/guest", { method: "POST" });
    if (res.ok) {
      router.refresh(); 
    }
  };

  return (
    <button
      onClick={handleGuestLogin}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Continue as Guest
    </button>
  );
}
