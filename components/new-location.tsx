"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { addLocation } from "@/lib/actions/add-location";
import { Datepicker } from "flowbite-react";

export default function NewLocationClient({ tripId }: { tripId: string }) {
  const [isPending, startTransation] = useTransition();

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center section">
      <div className="w-full max-w-md mx-auto">
        <div className="p-8 shadow-lg rounded-lg bg-card-surface text-card-main">
          <h1 className="text-3xl font-bold text-center mb-6 text-card-main">
            Add New Location
          </h1>

          <form
            className="space-y-6"
            action={(formData:FormData)=>{
              startTransation(()=>{
                                addLocation(formData , tripId)
              })
            }}  
          >
            <div>
              <label className="block text-sm font-medium text-card-main mb-2">
                Address
              </label>
              <input
                name="address"
                type="text"
                required
                className="w-full border px-4 py-2 rounded-md focus:outline-none"
                style={{borderColor: "var(--border)", color: "var(--foreground)", background: "var(--background)"}}
              />
            </div>
            <Button type="submit" className="w-full">
              {isPending ? "Adding..." : "Add Location"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}