import React from 'react'
import { Location } from '@/app/generated/prisma';

interface SortableItineraryProps {
  locations: Location[];
}

export default function SortableItinerary({ locations }: SortableItineraryProps) {
  if (!locations || locations.length === 0) {
    return (
      <div className="text-center p-8 text-card-main">
        <p>No locations added yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {locations.map((location, index) => (
        <div
          key={location.id}
          className="p-4 border rounded-md flex justify-between items-center hover:shadow transition-shadow bg-card-surface text-card-main"
          style={{borderColor: "var(--border)"}}
        >
          <div>
            <h4 className="font-medium text-card-main">{location.locationTitle}</h4>
            <p className="text-sm text-card-main truncate max-w-xs">
              {`Latitude: ${location.lat}, Longitude: ${location.lng}`}
            </p>
          </div>
          <div className="text-sm text-card-main">Day {location.order || index + 1}</div>
        </div>
      ))}
    </div>
  )
}
