import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCountryFromCoordinates } from "@/lib/actions/geocode";

const GET = async () => {
  try {
    const session = await auth();
    console.log("=== Globe Locations API Debug ===");
    console.log("Session:", session);
    
    if (!session) {
      console.log("No session found");
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    if (!session.user?.id) {
      console.log("No user ID in session");
      return NextResponse.json(
        { error: "No user ID found" },
        { status: 401 }
      );
    }

    console.log("User ID:", session.user.id);

    // Get all locations for this user
    const locations = await prisma.location.findMany({
      where: {
        trip: {
          userId: session.user.id,
        },
      },
      select: {
        locationTitle: true,
        lat: true,
        lng: true,
        trip: {
          select: {
            title: true,
          },
        },
      },
    });

    console.log("Raw locations from DB:", locations);
    console.log("Locations count:", locations.length);

    if (locations.length === 0) {
      console.log("No locations found for user");
      return NextResponse.json([]);
    }

    const transformedLocations = await Promise.all(
      locations.map(async (location) => {
        const { lat, lng, trip } = location;
        console.log("Processing location:", location);
        
        const geocodeResult = await getCountryFromCoordinates(lat, lng);
        console.log("Geocode result:", geocodeResult);

        return {
          name: `${trip.title} - ${location.locationTitle}`,
          lat,
          lng,
          country: geocodeResult.country,
        };
      })
    );

    console.log("Transformed locations:", transformedLocations);
    console.log("=== End Globe Locations API Debug ===");
    return NextResponse.json(transformedLocations);
  } catch (err) {
    console.error("Error in /api/globe-locations:", err);
    return NextResponse.json(
      { error: "Internal Error" },
      { status: 500 }
    );
  }
};

export { GET };

