"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { TransformedLocation } from "./globe-component";

interface GlobeSidebarProps {
  locations: TransformedLocation[];
  isLoading: boolean;
}

export default function GlobeSidebar({ locations, isLoading }: GlobeSidebarProps) {
  const visitedCountries = new Set<string>(
    locations
      .filter((loc) => loc.country && loc.country !== "Unknown")
      .map((loc) => loc.country)
  );

  if (isLoading) {
    return (
      <Card className="lg:sticky lg:top-8 bg-card-surface text-card-main section">
        <CardHeader>
          <CardTitle className="text-card-main">Countries Visited</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{borderColor: "var(--foreground)"}}></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (locations.length === 0) {
    return (
      <Card className="lg:sticky lg:top-8 bg-card-surface text-card-main section">
        <CardHeader>
          <CardTitle className="text-card-main">Countries Visited</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="mb-2 text-card-main">No travel data yet</p>
            <p className="text-sm text-card-main">Add some trips to see your visited countries here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="lg:sticky lg:top-8 bg-card-surface text-card-main section">
      <CardHeader>
        <CardTitle className="text-card-main">Countries Visited</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 rounded-lg" style={{background: "var(--accent)"}}>
            <p className="text-sm" style={{color: "var(--accent-foreground)"}}>
              You&apos;ve visited <span className="font-bold">{visitedCountries.size}</span> countries.
            </p>
          </div>

          <div className="space-y-2 max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] overflow-y-auto pr-2">
            {Array.from(visitedCountries)
              .sort()
              .map((country, key) => (
                <div
                  key={key}
                  className="flex items-center gap-2 p-3 rounded-lg transition-colors border"
                  style={{background: "var(--card)", color: "var(--card-foreground)", borderColor: "var(--border)"}}
                >
                  <MapPin className="h-4 w-4" style={{color: "var(--primary)"}} />
                  <span className="font-medium text-card-main">{country}</span>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
