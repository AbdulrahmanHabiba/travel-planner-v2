"use client";

import { Trip, Location } from "@/app/generated/prisma";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { calculateDaysBetweenDates } from "@/lib/format-date";
import Map from "./map";
import SortableItinerary from "@/components/sortable-itinerary";
export type TripWithLocation = Trip & {
  location: Location[];
};

interface TripDetailClientProps {
  trip: TripWithLocation;
}

export default function TripDetailClient({ trip }: TripDetailClientProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    trip && (
      <div className="container mx-auto px-4 py-8 space-y-8">
        {trip.imageUrl && (
          <div className="w-full h-72 md:h-96 overflow-hidden rounded-xl shadow-lg relative">
            {" "}
            <Image
              src={trip.imageUrl}
              alt={trip.title}
              className="object-cover"
              fill
              unoptimized
              priority
            />
          </div>
        )}
        <div className="bg-card-surface p-6 shadow rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-card-main">
              {" "}
              {trip.title}
            </h1>

            <div className="flex items-center text-card-main mt-2">
              <Calendar className="h-5 w-5 mr-2" />
              <span className="text-lg">
                {trip.startDate.toLocaleDateString()} -{" "}
                {trip.endDate.toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href={`/trips/${trip.id}/itinerary/new`}>
              <Button>
                {" "}
                <Plus className="mr-2 h-5 w-5" /> Add Location
              </Button>
            </Link>
          </div>
        </div>
        <div className="">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 space-x-2">
              <TabsTrigger value="overview" className="text-lg">
                OverView
              </TabsTrigger>
              <TabsTrigger value="itinerary" className="text-lg">
                Itinerary
              </TabsTrigger>
              <TabsTrigger value="map" className="text-lg">
                Map
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-4"> Trip Summary</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="h-6 w-6 mr-3 text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-700"> Dates</p>
                        <p className="text-sm text-gray-500">
                          {trip.startDate.toLocaleDateString()} -{" "}
                          {trip.endDate.toLocaleDateString()}
                          <br />
                          {calculateDaysBetweenDates(
                            trip.startDate,
                            trip.endDate
                          )}{" "}
                          day(S)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-6 w-6 mr-3 text-gray-500" />
                      <div>
                        <p> Destinations</p>
                        <p>
                          {trip.location.length}{" "}
                          {trip.location.length === 1
                            ? "location"
                            : "locations"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-72 rounded-lg overflow-hidden shadow">
                  <Map itineraries={trip.location} />
                </div>
                {trip.location.length === 0 && (
                  <div className="text-center p-4">
                    <p>Add locations to see them on the map.</p>
                    <Link href={`/trips/${trip.id}/itinerary/new`}>
                      <Button>
                        {" "}
                        <Plus className="mr-2 h-5 w-5" /> Add Location
                      </Button>
                    </Link>
                  </div>
                )}

                <div>
                  <p className="text-gray-600 leading-relaxed">
                    {trip.description}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="itinerary" className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold"> Full Itinerary</h2>
              </div>

              {trip.location.length === 0 ? (
                <div className="text-center p-4 mb-3">
                  <p>Add locations to see them on the itinerary.</p>
                  <Link href={`/trips/${trip.id}/itinerary/new`}>
                    <Button>
                      {" "}
                      <Plus className="mr-2 h-5 w-5" /> Add Location
                    </Button>
                  </Link>
                </div>
              ) : (
                <SortableItinerary locations={trip.location} />
              )}
            </TabsContent>
            <TabsContent value="map" className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold"> Map</h2>
              </div>
              <div className="h-72 sm:h-96 rounded-lg overflow-hidden shadow">
                <Map itineraries={trip.location} />
              </div>{" "}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  );
}
