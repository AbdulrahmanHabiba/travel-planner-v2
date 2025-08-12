"use client";

import { Avatar } from "flowbite-react";
import { User } from "lucide-react";

interface UserAvatarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function UserAvatar({ user, size = "md" }: UserAvatarProps) {
  // Get first letter of name or email
  const getInitials = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "؟";
  };

  // If user has image, show it
  if (user?.image) {
    return (
      <Avatar
        img={user.image}
        alt={user.name || user.email || "User"}
        size={size}
        rounded
      />
    );
  }

  // If user exists but no image, show initials
  if (user) {
    return (
      <Avatar
        placeholderInitials={getInitials()}
        size={size}
        rounded
      />
    );
  }

  // No user, show default icon
  return (
    <div className={`
      inline-flex items-center justify-center rounded-full bg-card-surface text-card-main
      ${size === "xs" ? "h-6 w-6" : ""}
      ${size === "sm" ? "h-8 w-8" : ""}
      ${size === "md" ? "h-10 w-10" : ""}
      ${size === "lg" ? "h-12 w-12" : ""}
      ${size === "xl" ? "h-16 w-16" : ""}
    `}>
      <User className={`
        text-card-main
        ${size === "xs" ? "h-3 w-3" : ""}
        ${size === "sm" ? "h-4 w-4" : ""}
        ${size === "md" ? "h-5 w-5" : ""}
        ${size === "lg" ? "h-6 w-6" : ""}
        ${size === "xl" ? "h-8 w-8" : ""}
      `} />
    </div>
  );
}


