"use client";

import { useRef, useEffect, useState } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";

export interface TransformedLocation {
  lat: number;
  lng: number;
  name: string;
  country: string;
}

interface GlobeComponentProps {
  locations: TransformedLocation[];
  isLoading: boolean;
}

export default function GlobeComponent({ locations, isLoading }: GlobeComponentProps) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (globeRef.current) {
      try {
        globeRef.current.controls().autoRotate = true;
        globeRef.current.controls().autoRotateSpeed = 0.5;
      } catch {
        setHasError(true);
      }
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-200"></div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-gray-700 dark:text-gray-200">
          <p className="mb-2">Failed to load globe</p>
          <p className="text-sm">Please refresh the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        pointColor={() => "#FF5733"}
        pointLabel="name"
        pointsData={locations}
        pointRadius={0.5}
        pointAltitude={0.1}
        pointsMerge={true}
      />
    </div>
  );
}
