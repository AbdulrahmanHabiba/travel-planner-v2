"use client";

import { useEffect, useState } from "react";
import Globe from "@/components/globe";
import GlobeSidebar from "@/components/globe-sidebar";
import { TransformedLocation } from "@/components/globe-component";
import Loading from "@/components/ui/loading";

export default function GlobePage() {
  const [locations, setLocations] = useState<TransformedLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasData, setHasData] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Handle theme toggle
  // useEffect(() => {
  //   if (isDark) {
  //     document.body.classList.add("dark");
  //   } else {
  //     document.body.classList.remove("dark");
  //   }
  // }, [isDark]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/globe-locations");
        
        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 401) {
            setError("Please sign in to view your travel data");
          } else {
            setError(errorData.error || "Failed to load travel data");
          }
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        setLocations(data);
        setHasData(data && data.length > 0);
        setError(null);
      } catch {
        setError("Failed to load travel data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const Title = (
    <h1 className="text-center text-xl sm:text-2xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-12 section">
      Your Travel Journey
    </h1>
  );

  if (error) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 lg:py-12">
          <div className="max-w-7xl mx-auto">
            {Title}
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border">
              <p className="text-red-600 mb-4">{error}</p>
              <p className="text-gray-900">Please try refreshing the page or signing in again.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoading && !hasData) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 lg:py-12">
          <div className="max-w-7xl mx-auto">
            {Title}
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-black">No Travel Data Yet</h2>
                <p className="text-gray-900 mb-4">
                  Start your travel journey by creating your first trip!
                </p>
                <link
                  href="/trips/new" 
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Your First Trip
                </link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 lg:py-12">
        <div className="max-w-7xl mx-auto">
          {Title}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-8 items-start">
            <div className="lg:col-span-2 bg-card-surface shadow-lg overflow-hidden ">
              <div className="p-3 sm:p-4 lg:p-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-card-main">
                  See where you&apos;ve been...
                </h2>

                <div className="w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center relative">
                  {isLoading ? <Loading label="Loading globe..." /> : <Globe locations={locations} isLoading={isLoading} />}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card-surface shadow-lg ">
                <GlobeSidebar locations={locations} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
