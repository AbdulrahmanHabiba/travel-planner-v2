import React from "react";

type SkeletonProps = {
  icon?: React.ReactNode;
  className?: string;
};

export default function Skeleton({ icon, className = "" }: SkeletonProps) {
  return (
    <div
      role="status"
      className={`flex items-center justify-center w-full h-full bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700 ${className}`}
    >
      {icon}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
