"use client";

import React from "react";
import { Location } from "@/app/generated/prisma";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x-red.png",
  iconUrl: "/leaflet/marker-icon-red.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

export default function MapComponent({ itineraries }: { itineraries: Location[] }) {
  const center =
    itineraries.length > 0
      ? { lat: itineraries[0].lat, lng: itineraries[0].lng }
      : { lat: 29.95375640, lng: 31.53700030 };

  return (
    <div className="globe-ball flex justify-center items-center ">
    <MapContainer
      center={center}
      zoom={8}
      style={{width : "250px"  , height : "250px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      {itineraries.map((location) => (
        <Marker key={location.id} position={[location.lat, location.lng]}>
          <Popup>{location.locationTitle}</Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>
  );
} 