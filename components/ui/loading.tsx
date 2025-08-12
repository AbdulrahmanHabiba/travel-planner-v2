"use client";

interface LoadingProps {
  label?: string;
}

export default function Loading({ label = "Loading..." }: LoadingProps) {
  return (
    <div className="flex items-center gap-3 text-main">
      <div className="animate-spin rounded-full h-6 w-6 border-2 border-t-transparent" style={{borderColor: "var(--border)"}} />
      <span className="text-sm">{label}</span>
    </div>
  );
}
