"use client";

import React from "react";
import { Location } from "@/app/generated/prisma";
import dynamic from "next/dynamic";
import Skeleton from "./ui/skeleton";
import { MapPin } from "lucide-react";

// Dynamically import the map component with no SSR
const MapComponent = dynamic(() => import("./map-component"), {
  ssr: false,
  loading: () => <Skeleton icon={<MapPin color="red" />} /> ,
});


export default function Map({ itineraries }: { itineraries: Location[] }) {
  return <MapComponent itineraries={itineraries} />;
}
