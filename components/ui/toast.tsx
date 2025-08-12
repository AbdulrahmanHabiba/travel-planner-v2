"use client";

import { Toast } from "flowbite-react";
import { Check, AlertTriangle, X, Info } from "lucide-react";

interface ToastNotificationProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
  onClose: () => void;
  show: boolean;
}

export default function ToastNotification({ 
  type, 
  message, 
  onClose, 
  show 
}: ToastNotificationProps) {
  if (!show) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <Check className="h-5 w-5" />;
      case "error":
        return <X className="h-5 w-5" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getColor = () => {
    switch (type) {
      case "success":
        return "bg-card-surface text-card-main";
      case "error":
        return "bg-card-surface text-card-main";
      case "warning":
        return "bg-card-surface text-card-main";
      default:
        return "bg-card-surface text-card-main";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Toast>
        <div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${getColor()}`}>
          {getIcon()}
        </div>
        <div className="ml-3 text-sm font-normal">{message}</div>
        <Toast.Toggle onDismiss={onClose} />
      </Toast>
    </div>
  );
}
