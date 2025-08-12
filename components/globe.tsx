"use client";

import React from "react";
import dynamic from "next/dynamic";
import Skeleton from "./ui/skeleton";
import { Globe as GlobeIcon } from "lucide-react";
import { TransformedLocation } from "./globe-component";

// Dynamically import the globe component with no SSR
const GlobeComponent = dynamic(() => import("./globe-component"), {
  ssr: false,
  loading: () => <Skeleton icon={<GlobeIcon color="blue" />} />,
});

interface GlobeProps {
  locations: TransformedLocation[];
  isLoading: boolean;
}

export default function Globe({ locations, isLoading }: GlobeProps) {
  return <GlobeComponent locations={locations} isLoading={isLoading} />;
}
