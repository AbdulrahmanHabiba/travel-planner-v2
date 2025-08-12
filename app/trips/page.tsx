"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDateValue } from '@/lib/format-date';
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { Trip } from '@/app/generated/prisma';
import ToastNotification from '@/components/ui/toast';
import { Plus, Calendar, ChevronDown, CalendarClock } from 'lucide-react';
import Loading from '@/components/ui/loading';

interface Session {
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [toast, setToast] = useState<{show: boolean; type: "success" | "error" | "warning" | "info"; message: string}>({
    show: false,
    type: "info",
    message: ""
  });

  const displayedTrips = trips.slice(0, visibleCount);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch('/api/trips');
        const data = await response.json();
        
        if (data.success) {
          const sortedTrips = [...data.trips].sort((a: Trip, b: Trip) => 
            getDateValue(new Date(b.startDate)) - getDateValue(new Date(a.startDate))
          );
          setTrips(sortedTrips);
        } else {
          setToast({
            show: true,
            type: "error",
            message: data.error || "Failed to load trips"
          });
        }
      } catch (error) {
        setToast({
          show: true,
          type: "error",
          message: "Network error"
        });
      } finally {
        setLoading(false);
      }
    };

    const fetchSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();
        if (data.success) {
          setSession(data);
        } else if (response.status === 401) {
          setToast({
            show: true,
            type: "warning",
            message: "Please sign in first"
          });
        }
      } catch (error) {
        setToast({
          show: true,
          type: "error",
          message: "Failed to verify session"
        });
      }
    };

    fetchSession();
    fetchTrips();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingTrips = trips.filter((trip) => getDateValue(new Date(trip.startDate)) >= getDateValue(today));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading label="Loading trips..." />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen bg-surface text-main text-xl">
        Please Sign In.
      </div>
    );
  }

  return (
    <div className="space-y-6 container mx-auto px-4 py-8 ">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-main"> Dashboard</h1>
        <Link href="/trips/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Trip
          </Button>
        </Link>
      </div>

      <Card className="bg-card-surface">
        <CardHeader>
          <CardTitle className="text-card-main"> Welcome back, {session.user?.name} </CardTitle>
        </CardHeader>

        <CardContent>     
          <p className="text-card-main">
            {trips.length === 0
              ? "Start planning your first trip by clicking the button above."
              : `You have ${trips.length} ${
                  trips.length === 1 ? "trip" : "trips"
                } planned. ${
                upcomingTrips.length > 0 ? `${upcomingTrips.length} upcoming.` : "No upcoming trips."
              } `}
          </p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-card-main"> Your Recent Trips</h2>
        {trips.length === 0 ? (
          <Card className="">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <h3 className="text-xl font-medium mb-2"> No trips yet.</h3>
              <p className="text-center mb-4 max-w-md">
                Start planning your adventure by creating your first trip.
              </p>
              <Link href="/trips/new">
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Trip
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedTrips.map((trip) => (
                <Link key={trip.id} href={`/trips/${trip.id}`}>
                  <Card className="h-full hover:shadow-md transition-shadow dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="line-clamp-1 ">{trip.title}</CardTitle>
                    </CardHeader>

                    <CardContent className='relative'>
                      <p className="text-sm line-clamp-2 mb-2 ">
                        {trip.description}
                      </p>
                      <div className="text-sm ">
                        {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                      </div>
                      {upcomingTrips.length > 0 && upcomingTrips.includes(trip) && <Button className='absolute right-2 -bottom-4 rounded-l-full p-1 bg-red-500 hover:bg-red-400'><CalendarClock /></Button>}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            
            {visibleCount < trips.length && (
              <div className="flex justify-center mt-6">
                <Button 
                  onClick={handleLoadMore}
                  variant="outline"
                  className="px-8 flex items-center gap-2"
                >
                  <ChevronDown className="h-4 w-4" />
                  Load More Trips
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      
      <ToastNotification
        type={toast.type}
        message={toast.message}
        show={toast.show}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />
    </div>
  )
}
